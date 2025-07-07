import { NextResponse } from 'next/server';

export async function GET() {
  try {
    // Enhanced health check for AWS deployment
    const health = {
      status: 'healthy',
      timestamp: new Date().toISOString(),
      version: process.env.npm_package_version || '0.1.0',
      environment: process.env.NODE_ENV || 'development',
      uptime: Math.round(process.uptime()),
      memory: {
        used: Math.round(process.memoryUsage().heapUsed / 1024 / 1024 * 100) / 100,
        total: Math.round(process.memoryUsage().heapTotal / 1024 / 1024 * 100) / 100,
        external: Math.round(process.memoryUsage().external / 1024 / 1024 * 100) / 100,
      },
      checks: {
        nextjs: true,
        environment_variables: {
          supabase_url: !!process.env.NEXT_PUBLIC_SUPABASE_URL,
          supabase_key: !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
          mapbox_token: !!process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN,
        }
      }
    };

    return NextResponse.json(health, { status: 200 });
  } catch (error) {
    console.error('Health check failed:', error);
    
    return NextResponse.json(
      { 
        status: 'unhealthy', 
        message: 'Health check failed',
        timestamp: new Date().toISOString(),
        error: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 503 }
    );
  }
}
