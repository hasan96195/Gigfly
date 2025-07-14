-- Create user gigs table for real gig storage
CREATE TABLE public.user_gigs (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  category TEXT NOT NULL,
  images TEXT[] DEFAULT ARRAY[]::TEXT[],
  packages JSONB NOT NULL DEFAULT '[]'::JSONB,
  tags TEXT[] DEFAULT ARRAY[]::TEXT[],
  status TEXT NOT NULL DEFAULT 'active',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create messages table for user conversations
CREATE TABLE public.messages (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  sender_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  recipient_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  subject TEXT,
  message TEXT NOT NULL,
  is_read BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create favorites table for user favorite gigs
CREATE TABLE public.user_favorites (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  gig_id UUID NOT NULL,
  gig_data JSONB NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(user_id, gig_id)
);

-- Enable RLS on all tables
ALTER TABLE public.user_gigs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_favorites ENABLE ROW LEVEL SECURITY;

-- RLS policies for user_gigs
CREATE POLICY "Users can view their own gigs" ON public.user_gigs
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own gigs" ON public.user_gigs
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own gigs" ON public.user_gigs
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own gigs" ON public.user_gigs
  FOR DELETE USING (auth.uid() = user_id);

-- RLS policies for messages
CREATE POLICY "Users can view their messages" ON public.messages
  FOR SELECT USING (auth.uid() = sender_id OR auth.uid() = recipient_id);

CREATE POLICY "Users can send messages" ON public.messages
  FOR INSERT WITH CHECK (auth.uid() = sender_id);

CREATE POLICY "Users can update messages they received" ON public.messages
  FOR UPDATE USING (auth.uid() = recipient_id);

-- RLS policies for user_favorites
CREATE POLICY "Users can view their favorites" ON public.user_favorites
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can manage their favorites" ON public.user_favorites
  FOR ALL USING (auth.uid() = user_id);

-- Create trigger for updating timestamps on user_gigs
CREATE TRIGGER update_user_gigs_updated_at
  BEFORE UPDATE ON public.user_gigs
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();