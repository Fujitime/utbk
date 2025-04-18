import CopyWebpackPlugin from 'copy-webpack-plugin'
import { transformSync } from 'esbuild'

let userConfig = undefined
try {
 // try to import ESM first
 userConfig = await import('.config.mjs')
} catch (e) {
 try {
   // fallback to CJS import
   userConfig = await import(".config");
 } catch (innerError) {
   // ignore error
 }
}

/** @type {import('next').NextConfig} */
const nextConfig = {
 eslint: {
   ignoreDuringBuilds: true,
 },
 typescript: {
   ignoreBuildErrors: true,
 },
 images: {
   unoptimized: true,
 },
 experimental: {
   webpackBuildWorker: true,
   parallelServerBuildTraces: true,
   parallelServerCompiles: true,
 },
 reactStrictMode: true,
 swcMinify: true,
 // Add webpack configuration for service worker
 webpack: (config, { isServer }) => {
   // Only run on the client
   if (!isServer) {
     // Copy the service worker to the public directory
     config.plugins.push(
       new CopyWebpackPlugin({
         patterns: [
           {
             from: 'app/sw.ts',
             to: '../public/sw.js',
             transform(content) {
               return transformSync(content.toString(), {
                 loader: 'ts',
                 target: 'es2015',
                 minify: true,
               }).code;
             },
           },
         ],
       })
     );
   }
   return config;
 },
}

if (userConfig) {
 // ESM imports will have a "default" property
 const config = userConfig.default || userConfig

 for (const key in config) {
   if (
     typeof nextConfig[key] === 'object' &&
     !Array.isArray(nextConfig[key])
   ) {
     nextConfig[key] = {
       ...nextConfig[key],
       ...config[key],
     }
   } else {
     nextConfig[key] = config[key]
   }
 }
}

export default nextConfig
