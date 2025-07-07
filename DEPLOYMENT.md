# WildTrace - Deployment Guide

## 🚀 Quick Deploy Command

For future deployments, use this single command:

```bash
fly deploy --build-arg NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN="pk.eyJ1Ijoia2FzeTk5NjYiLCJhIjoiY21jc2MzY2dwMTJwdTJrcG15b2UwM2xkMCJ9.jCy11Lv06CoKRP5vo_lkgw" --build-arg NEXT_PUBLIC_SUPABASE_URL="https://umxkciskfoaacwhzdamd.supabase.co" --build-arg NEXT_PUBLIC_SUPABASE_ANON_KEY="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVteGtjaXNrZm9hYWN3aHpkYW1kIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTE4NTY0MDMsImV4cCI6MjA2NzQzMjQwM30.iht9pyj3hPXx_AVEsDk9Fbz9Yzxdo9NyRxn8Ov_u3Xs"
```



### Quick Commands
```bash
# Check app status
fly status

# View logs
fly logs

# Open deployed app
fly open

# SSH into container
fly ssh console

# Restart app
fly machine restart
```

## 🔍 Troubleshooting

### Common Issues & Solutions

#### 1. Mapbox Error: "Unauthorized" or "Invalid Token"
**Cause**: Incorrect or expired Mapbox token
**Solution**: Verify token and redeploy with correct build args

#### 2. Supabase Connection Error
**Cause**: Incorrect Supabase URL or anon key
**Solution**: Check Supabase project settings and update environment variables

#### 3. Build Failures
**Cause**: Missing environment variables during build
**Solution**: Ensure all `--build-arg` parameters are provided

#### 4. App Not Loading
```bash
# Check logs for errors
fly logs --app wildtrace

# Verify app status
fly status --app wildtrace

# Restart if needed
fly machine restart --app wildtrace
```

### Debug Commands
```bash
# View environment in container
fly ssh console --app wildtrace
env | grep NEXT_PUBLIC

# Check build logs
fly logs --app wildtrace

# Monitor real-time logs
fly logs --app wildtrace --follow
```

## 📊 App Information

- **App Name**: `wildtrace`
- **URL**: https://wildtrace.fly.dev/
- **Region**: Automatically distributed globally
- **Platform**: Fly.io
- **Framework**: Next.js 14

## 🔐 Security Notes

### Safe for Client-Side
- `NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN`: Public Mapbox token (restricted by domain)
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`: Supabase anonymous key (limited permissions)
- `NEXT_PUBLIC_SUPABASE_URL`: Public Supabase project URL

### Not Included (Server-Side Only)
- Supabase Service Role Key (if needed for admin operations)
- Private API keys
- Database credentials

## 📝 Deployment Checklist

Before deploying:
- [ ] Verify Mapbox token is valid
- [ ] Confirm Supabase project is accessible
- [ ] Test locally with `npm run build`
- [ ] Ensure fly.toml is configured correctly
- [ ] Run deployment command with all build args

After deploying:
- [ ] Check `fly status` for successful deployment
- [ ] Visit https://wildtrace.fly.dev/ to verify
- [ ] Check browser console for any errors
- [ ] Test map functionality
- [ ] Verify data loading from Supabase

---

## 📞 Quick Reference

**One-line deploy command:**
```bash
fly deploy --build-arg NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN="pk.eyJ1Ijoia2FzeTk5NjYiLCJhIjoiY21jc2MzY2dwMTJwdTJrcG15b2UwM2xkMCJ9.jCy11Lv06CoKRP5vo_lkgw" --build-arg NEXT_PUBLIC_SUPABASE_URL="https://umxkciskfoaacwhzdamd.supabase.co" --build-arg NEXT_PUBLIC_SUPABASE_ANON_KEY="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVteGtjaXNrZm9hYWN3aHpkYW1kIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTE4NTY0MDMsImV4cCI6MjA2NzQzMjQwM30.iht9pyj3hPXx_AVEsDk9Fbz9Yzxdo9NyRxn8Ov_u3Xs"
```

**Live App:** https://wildtrace.fly.dev/

---

*Last Updated: January 2025*
*Deployment Status: ✅ Working*
