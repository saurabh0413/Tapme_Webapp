import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config();

const supabaseUrl = process.env.SUPABASE_URL!;
const supabaseKey = process.env.SUPABASE_KEY!;
const supabase = createClient(supabaseUrl, supabaseKey);

const userResolvers = {
    Query: {
      balance: async (_: any, { userId }: { userId: string }) => {
        const { data, error } = await supabase
          .from('users')
          .select('coins')
          .eq('id', userId)
          .single();
  
        if (error) {
          throw new Error(`Database query failed: ${error.message}`);
        }
  
        return data.coins;
      },
    },
    Mutation: {
      updateCoins: async (_: any, { userId }: { userId: string }) => {
        const { data: userData, error: userError } = await supabase
          .from('users')
          .select('coins')
          .eq('id', userId)
          .single();
  
        if (userError) {
          throw new Error(`Database query failed: ${userError.message}`);
        }
  
        const newBalance = (userData?.coins || 0) + 1;
  
        const { error: updateError } = await supabase
          .from('users')
          .update({ coins: newBalance })
          .eq('id', userId);
  
        if (updateError) {
          throw new Error(`Database update failed: ${updateError.message}`);
        }
  
        return { balance: newBalance };
      },
    },
  };

export default userResolvers;
