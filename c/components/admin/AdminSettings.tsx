import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Save, Settings, RefreshCw } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

const AdminSettings = () => {
  const [settings, setSettings] = useState({
    siteName: "GigFly Clone",
    siteDescription: "A freelance marketplace for digital services",
    commissionRate: "10",
    maintenanceMode: false,
    userRegistration: true,
    emailNotifications: true,
    supportEmail: "support@example.com",
    maxFileSize: "10",
  });
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    loadSettings();
  }, []);

  const loadSettings = async () => {
    try {
      setLoading(true);
      console.log("Loading system settings...");

      // Try to load from Supabase first
      const { data, error } = await supabase
        .from("system_settings")
        .select("setting_key, setting_value");

      if (!error && data) {
        const settingsMap: Record<string, string> = {};
        data.forEach((item) => {
          settingsMap[item.setting_key] = item.setting_value || "";
        });

        // Update settings with loaded values
        setSettings((prev) => ({
          ...prev,
          siteName: settingsMap.siteName || prev.siteName,
          siteDescription: settingsMap.siteDescription || prev.siteDescription,
          commissionRate: settingsMap.commissionRate || prev.commissionRate,
          maintenanceMode: settingsMap.maintenanceMode === "true",
          userRegistration: settingsMap.userRegistration !== "false",
          emailNotifications: settingsMap.emailNotifications !== "false",
          supportEmail: settingsMap.supportEmail || prev.supportEmail,
          maxFileSize: settingsMap.maxFileSize || prev.maxFileSize,
        }));

        console.log("Settings loaded from database");
      } else {
        // Fallback to localStorage
        const stored = localStorage.getItem("adminSettings");
        if (stored) {
          const parsedSettings = JSON.parse(stored);
          setSettings((prev) => ({ ...prev, ...parsedSettings }));
          console.log("Settings loaded from localStorage");
        }
      }
    } catch (error) {
      console.error("Error loading settings:", error);
      toast({
        title: "Error",
        description: "Failed to load settings. Using defaults.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    try {
      setSaving(true);
      console.log("Saving settings...");

      // Save to localStorage as backup
      localStorage.setItem("adminSettings", JSON.stringify(settings));

      // Try to save to Supabase
      const settingsToSave = [
        { setting_key: "siteName", setting_value: settings.siteName },
        {
          setting_key: "siteDescription",
          setting_value: settings.siteDescription,
        },
        {
          setting_key: "commissionRate",
          setting_value: settings.commissionRate,
        },
        {
          setting_key: "maintenanceMode",
          setting_value: settings.maintenanceMode.toString(),
        },
        {
          setting_key: "userRegistration",
          setting_value: settings.userRegistration.toString(),
        },
        {
          setting_key: "emailNotifications",
          setting_value: settings.emailNotifications.toString(),
        },
        { setting_key: "supportEmail", setting_value: settings.supportEmail },
        { setting_key: "maxFileSize", setting_value: settings.maxFileSize },
      ];

      for (const setting of settingsToSave) {
        const { error } = await supabase.from("system_settings").upsert(
          {
            setting_key: setting.setting_key,
            setting_value: setting.setting_value,
            updated_at: new Date().toISOString(),
          },
          { onConflict: "setting_key" }
        );

        if (error) {
          console.error(`Error saving ${setting.setting_key}:`, error);
        }
      }

      toast({
        title: "Success",
        description: "Settings saved successfully!",
      });

      console.log("Settings saved successfully");
    } catch (error) {
      console.error("Error saving settings:", error);
      toast({
        title: "Error",
        description: "Failed to save settings. Please try again.",
        variant: "destructive",
      });
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        <span className="ml-2">Loading settings...</span>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold">System Settings</h3>
        <div className="flex gap-2">
          <Button
            variant="outline"
            onClick={loadSettings}
            disabled={loading}
            className="flex items-center gap-2"
          >
            <RefreshCw className="h-4 w-4" />
            Refresh
          </Button>
          <Button
            onClick={handleSave}
            disabled={saving}
            className="flex items-center gap-2"
          >
            <Save className="h-4 w-4" />
            {saving ? "Saving..." : "Save Changes"}
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Settings className="h-5 w-5" />
              General Settings
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">
                Site Name
              </label>
              <Input
                value={settings.siteName}
                onChange={(e) =>
                  setSettings({ ...settings, siteName: e.target.value })
                }
                placeholder="Enter site name"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">
                Site Description
              </label>
              <Textarea
                value={settings.siteDescription}
                onChange={(e) =>
                  setSettings({ ...settings, siteDescription: e.target.value })
                }
                rows={3}
                placeholder="Enter site description"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">
                Commission Rate (%)
              </label>
              <Input
                type="number"
                min="0"
                max="100"
                value={settings.commissionRate}
                onChange={(e) =>
                  setSettings({ ...settings, commissionRate: e.target.value })
                }
                placeholder="10"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">
                Support Email
              </label>
              <Input
                type="email"
                value={settings.supportEmail}
                onChange={(e) =>
                  setSettings({ ...settings, supportEmail: e.target.value })
                }
                placeholder="support@example.com"
              />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Platform Controls</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <label className="font-medium">Maintenance Mode</label>
                <p className="text-sm text-gray-600">
                  Temporarily disable the site
                </p>
              </div>
              <Switch
                checked={settings.maintenanceMode}
                onCheckedChange={(checked) =>
                  setSettings({ ...settings, maintenanceMode: checked })
                }
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <label className="font-medium">User Registration</label>
                <p className="text-sm text-gray-600">Allow new user signups</p>
              </div>
              <Switch
                checked={settings.userRegistration}
                onCheckedChange={(checked) =>
                  setSettings({ ...settings, userRegistration: checked })
                }
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <label className="font-medium">Email Notifications</label>
                <p className="text-sm text-gray-600">
                  Send system notifications
                </p>
              </div>
              <Switch
                checked={settings.emailNotifications}
                onCheckedChange={(checked) =>
                  setSettings({ ...settings, emailNotifications: checked })
                }
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">
                Max File Size (MB)
              </label>
              <Input
                type="number"
                min="1"
                max="100"
                value={settings.maxFileSize}
                onChange={(e) =>
                  setSettings({ ...settings, maxFileSize: e.target.value })
                }
                placeholder="10"
              />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminSettings;
