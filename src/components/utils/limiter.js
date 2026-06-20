import {Ratelimit} from "@upstash/ratelimit";
import {Redis} from "@upstash/redis";
import dotenv from 'dotenv';
dotenv.config(); 
 
export const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL,
  token: process.env.UPSTASH_REDIS_REST_TOKEN
})
 
// Create a new ratelimiter, that allows 4 requests per 1 day per unique IP.
export const ratelimit = new Ratelimit({
  redis: redis,
  limiter: Ratelimit.fixedWindow(4, "1 d"),
  analytics: true,
  prefix: "ratelimit",
});

// function to get the IP address of the user and set it in Redis with an expiration time of 1 day
export const setIP = async (ip) => {
   try {
     await redis.set("userIP", ip, { ex: 60 * 60 * 24 }); // Set IP with 1 day expiration
   }catch (error) {
      console.error('Error setting IP in Redis:', error);
   }
}

