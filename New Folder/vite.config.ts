import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'
import dynamicImport from 'vite-plugin-dynamic-import'

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react(), dynamicImport()],
    assetsInclude: ['**/*.md'],
    resolve: {
        alias: {
            '@': path.join(__dirname, 'src'),
        },
    },
    server: {
        host: '0.0.0.0',
        
        // proxy: {
        //     '/api': {
        //         target: 'https://api-dev.gogetwell.ai', // TODO @emondaslearner please add condition here based on Production and development
        //         // target: 'api-dev.gogetwell.ai',
        //         changeOrigin: true,
        //         secure: false,
        //         configure: (proxy, _options) => {
        //             proxy.on('error', (err, _req, _res) => {
        //                 console.log('proxy error', err)
        //             })
        //             proxy.on('proxyReq', (proxyReq, req, _res) => {
        //                 console.log(
        //                     'Sending Request to the Target:',
        //                     req.method,
        //                     req.url,
        //                 )
        //             })
        //             proxy.on('proxyRes', (proxyRes, req, _res) => {
        //                 console.log(
        //                     'Received Response from the Target:',
        //                     proxyRes.statusCode,
        //                     req.url,
        //                 )
        //             })
        //         },
        //     },
        //     '/ai': {
        //         target: 'https://ml-dev.gogetwell.ai',
        //         changeOrigin: true,
        //         secure: false,
        //         rewrite: (path) => path.replace(/^\/ai/, ''),
        //         configure: (proxy, _options) => {
        //             proxy.on('error', (err, _req, _res) => {
        //                 console.log('proxy error', err)
        //             })
        //             proxy.on('proxyReq', (proxyReq, req, _res) => {
        //                 console.log(
        //                     'Sending Request to the Target:',
        //                     req.method,
        //                     req.url,
        //                 )
        //             })
        //             proxy.on('proxyRes', (proxyRes, req, _res) => {
        //                 console.log(
        //                     'Received Response from the Target:',
        //                     proxyRes.statusCode,
        //                     req.url,
        //                 )
        //             })
        //         },
        //     },
        // },
    port: 5173
    },
    build: {
        outDir: 'build',
    },
})
