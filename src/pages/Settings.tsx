import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, User, Lock, Shield, Database, Plug, Settings as SettingsIcon, Upload, Download, Trash2, RefreshCw, Palette } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";
import { AnimatedBackground } from "@/components/AnimatedBackground";
import { useTheme } from "@/contexts/ThemeContext";

const Settings = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { mode, accentColor, setMode, setAccentColor, toggleMode } = useTheme();
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [pushNotifications, setPushNotifications] = useState(false);
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(false);

  const handleSave = () => {
    toast({
      title: "Settings saved",
      description: "Your preferences have been updated successfully.",
    });
  };

  return (
    <div className="min-h-screen bg-background relative">
      <AnimatedBackground />
      {/* Header */}
      <header className="glass border-b border-border/50 backdrop-blur-xl sticky top-0 z-50">
        <div className="container mx-auto px-6 py-4 flex items-center gap-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate("/")}
            className="hover:bg-accent/50"
          >
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <div>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-primary via-accent to-secondary bg-clip-text text-transparent">
              Settings
            </h1>
            <p className="text-sm text-muted-foreground">Manage your preferences and account</p>
          </div>
        </div>
      </header>

      {/* Content */}
      <div className="container mx-auto px-6 py-8">
        <Tabs defaultValue="general" className="w-full">
          <TabsList className="glass mb-8 p-1">
            <TabsTrigger value="appearance" className="gap-2">
              <Palette className="w-4 h-4" />
              Appearance
            </TabsTrigger>
            <TabsTrigger value="general" className="gap-2">
              <User className="w-4 h-4" />
              General
            </TabsTrigger>
            <TabsTrigger value="security" className="gap-2">
              <Shield className="w-4 h-4" />
              Security
            </TabsTrigger>
            <TabsTrigger value="privacy" className="gap-2">
              <Lock className="w-4 h-4" />
              Privacy
            </TabsTrigger>
            <TabsTrigger value="integrations" className="gap-2">
              <Plug className="w-4 h-4" />
              Integrations
            </TabsTrigger>
            <TabsTrigger value="dashboard" className="gap-2">
              <SettingsIcon className="w-4 h-4" />
              Dashboard
            </TabsTrigger>
          </TabsList>

          {/* Theme & Appearance */}
          <TabsContent value="appearance" className="space-y-6 animate-fade-in">
            <Card className="glass border-border/50 hover:border-primary/30 transition-all duration-500 hover:shadow-xl">
              <CardHeader>
                <CardTitle>Theme Mode</CardTitle>
                <CardDescription>Choose between light and dark theme</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="theme-mode" className="text-base">Dark Mode</Label>
                    <p className="text-sm text-muted-foreground">
                      {mode === "dark" ? "Currently using dark theme" : "Currently using light theme"}
                    </p>
                  </div>
                  <Switch
                    id="theme-mode"
                    checked={mode === "dark"}
                    onCheckedChange={(checked) => setMode(checked ? "dark" : "light")}
                  />
                </div>
                <Separator />
                <div className="flex gap-4">
                  <Button
                    variant={mode === "light" ? "default" : "outline"}
                    onClick={() => setMode("light")}
                    className="flex-1"
                  >
                    ☀️ Light
                  </Button>
                  <Button
                    variant={mode === "dark" ? "default" : "outline"}
                    onClick={() => setMode("dark")}
                    className="flex-1"
                  >
                    🌙 Dark
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card className="glass border-border/50 hover:border-primary/30 transition-all duration-500 hover:shadow-xl">
              <CardHeader>
                <CardTitle>Accent Color</CardTitle>
                <CardDescription>Customize your primary accent color</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="accent-color">Choose Accent Color</Label>
                  <div className="flex gap-4 items-center">
                    <input
                      id="accent-color"
                      type="color"
                      value={accentColor}
                      onChange={(e) => setAccentColor(e.target.value)}
                      className="w-20 h-20 rounded-lg cursor-pointer border-2 border-border"
                    />
                    <div className="flex-1 space-y-2">
                      <Input
                        type="text"
                        value={accentColor}
                        onChange={(e) => setAccentColor(e.target.value)}
                        placeholder="#00D9FF"
                        className="font-mono"
                      />
                      <p className="text-xs text-muted-foreground">
                        Current color: {accentColor}
                      </p>
                    </div>
                  </div>
                </div>
                <Separator />
                <div className="space-y-2">
                  <Label>Quick Presets</Label>
                  <div className="grid grid-cols-6 gap-2">
                    {["#00D9FF", "#A855F7", "#3B82F6", "#10B981", "#F59E0B", "#EF4444"].map((color) => (
                      <button
                        key={color}
                        onClick={() => setAccentColor(color)}
                        className="w-full h-12 rounded-lg border-2 hover:scale-110 transition-transform"
                        style={{ 
                          backgroundColor: color,
                          borderColor: accentColor === color ? "white" : "transparent"
                        }}
                        title={color}
                      />
                    ))}
                  </div>
                </div>
                <Separator />
                <div className="p-4 rounded-lg bg-card border border-border space-y-2">
                  <p className="text-sm font-medium">Live Preview</p>
                  <div className="flex gap-2 flex-wrap">
                    <Button size="sm">Primary Button</Button>
                    <Button size="sm" variant="outline">Outline Button</Button>
                    <Button size="sm" variant="secondary">Secondary</Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* General Settings */}
          <TabsContent value="general" className="space-y-6 animate-fade-in">
            <Card className="glass border-border/50 hover:border-primary/30 transition-all duration-500 hover:shadow-xl">
              <CardHeader>
                <CardTitle>Profile Management</CardTitle>
                <CardDescription>Update your personal information</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input id="name" placeholder="Admin User" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <Input id="email" type="email" placeholder="admin@reputation.io" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="avatar">Profile Picture</Label>
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center">
                      <User className="w-8 h-8 text-primary-foreground" />
                    </div>
                    <Button variant="outline" size="sm">
                      <Upload className="w-4 h-4 mr-2" />
                      Upload New
                    </Button>
                  </div>
                </div>
                <Separator />
                <div className="space-y-2">
                  <Label htmlFor="current-password">Current Password</Label>
                  <Input id="current-password" type="password" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="new-password">New Password</Label>
                  <Input id="new-password" type="password" />
                </div>
              </CardContent>
            </Card>



            <Card className="glass border-border/50 hover:border-secondary/30 transition-all duration-500 hover:shadow-xl">
              <CardHeader>
                <CardTitle>Notifications</CardTitle>
                <CardDescription>Configure how you receive alerts</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="email-notif">Email Notifications</Label>
                    <p className="text-sm text-muted-foreground">Receive updates via email</p>
                  </div>
                  <Switch
                    id="email-notif"
                    checked={emailNotifications}
                    onCheckedChange={setEmailNotifications}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="push-notif">Push Notifications</Label>
                    <p className="text-sm text-muted-foreground">Browser push notifications</p>
                  </div>
                  <Switch
                    id="push-notif"
                    checked={pushNotifications}
                    onCheckedChange={setPushNotifications}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="notif-freq">Notification Frequency</Label>
                  <Select defaultValue="daily">
                    <SelectTrigger id="notif-freq">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="realtime">Real-time</SelectItem>
                      <SelectItem value="daily">Daily Digest</SelectItem>
                      <SelectItem value="weekly">Weekly Summary</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>

            <div className="flex justify-end">
              <Button onClick={handleSave} className="glow-primary">
                Save Changes
              </Button>
            </div>
          </TabsContent>

          {/* Account & Security */}
          <TabsContent value="security" className="space-y-6 animate-fade-in">
            <Card className="glass border-border/50 hover:border-primary/30 transition-all duration-500 hover:shadow-xl">
              <CardHeader>
                <CardTitle>Two-Factor Authentication</CardTitle>
                <CardDescription>Add an extra layer of security</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="2fa">Enable 2FA</Label>
                    <p className="text-sm text-muted-foreground">Protect your account with 2FA</p>
                  </div>
                  <Switch
                    id="2fa"
                    checked={twoFactorEnabled}
                    onCheckedChange={setTwoFactorEnabled}
                  />
                </div>
                {twoFactorEnabled && (
                  <Button variant="outline">Configure Authenticator App</Button>
                )}
              </CardContent>
            </Card>

            <Card className="glass border-border/50 hover:border-accent/30 transition-all duration-500 hover:shadow-xl">
              <CardHeader>
                <CardTitle>Connected Accounts</CardTitle>
                <CardDescription>Manage third-party integrations</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center justify-between p-3 rounded-lg border border-border/50">
                  <span className="text-sm font-medium">Google</span>
                  <Button variant="outline" size="sm">Connect</Button>
                </div>
                <div className="flex items-center justify-between p-3 rounded-lg border border-border/50">
                  <span className="text-sm font-medium">LinkedIn</span>
                  <Button variant="outline" size="sm">Connect</Button>
                </div>
                <div className="flex items-center justify-between p-3 rounded-lg border border-border/50">
                  <span className="text-sm font-medium">GitHub</span>
                  <Button variant="outline" size="sm">Connect</Button>
                </div>
              </CardContent>
            </Card>

            <Card className="glass border-border/50 hover:border-secondary/30 transition-all duration-500 hover:shadow-xl">
              <CardHeader>
                <CardTitle>Active Sessions</CardTitle>
                <CardDescription>Manage your logged-in devices</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 rounded-lg border border-border/50">
                    <div>
                      <p className="text-sm font-medium">Current Device</p>
                      <p className="text-xs text-muted-foreground">Chrome on Windows • Active now</p>
                    </div>
                    <span className="text-xs text-green-500">Active</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Data & Privacy */}
          <TabsContent value="privacy" className="space-y-6 animate-fade-in">
            <Card className="glass border-border/50 hover:border-primary/30 transition-all duration-500 hover:shadow-xl">
              <CardHeader>
                <CardTitle>Data Management</CardTitle>
                <CardDescription>Control your stored data</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <Button variant="outline" className="w-full justify-start">
                  <Download className="w-4 h-4 mr-2" />
                  Download Personal Data
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <RefreshCw className="w-4 h-4 mr-2" />
                  Clear Cache
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <SettingsIcon className="w-4 h-4 mr-2" />
                  Reset to Default Settings
                </Button>
              </CardContent>
            </Card>

            <Card className="glass border-border/50 border-destructive/50">
              <CardHeader>
                <CardTitle className="text-destructive">Danger Zone</CardTitle>
                <CardDescription>Irreversible actions</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <Button variant="destructive" className="w-full justify-start">
                  <Trash2 className="w-4 h-4 mr-2" />
                  Delete Account
                </Button>
                <p className="text-xs text-muted-foreground">
                  This action cannot be undone. Your account and all associated data will be permanently deleted.
                </p>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Integrations */}
          <TabsContent value="integrations" className="space-y-6 animate-fade-in">
            <Card className="glass border-border/50 hover:border-primary/30 transition-all duration-500 hover:shadow-xl">
              <CardHeader>
                <CardTitle>Hugging Face API</CardTitle>
                <CardDescription>Connect your AI integration</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="hf-token">API Token</Label>
                  <Input id="hf-token" type="password" placeholder="hf_••••••••••••••••" />
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" className="flex-1">Test Connection</Button>
                  <Button className="flex-1">Save Token</Button>
                </div>
              </CardContent>
            </Card>

            <Card className="glass border-border/50 hover:border-accent/30 transition-all duration-500 hover:shadow-xl">
              <CardHeader>
                <CardTitle>Review Platforms</CardTitle>
                <CardDescription>Connect to external review sources</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center justify-between p-3 rounded-lg border border-border/50">
                  <span className="text-sm font-medium">Google Reviews</span>
                  <Button variant="outline" size="sm">Connect</Button>
                </div>
                <div className="flex items-center justify-between p-3 rounded-lg border border-border/50">
                  <span className="text-sm font-medium">Trustpilot</span>
                  <Button variant="outline" size="sm">Connect</Button>
                </div>
                <div className="flex items-center justify-between p-3 rounded-lg border border-border/50">
                  <span className="text-sm font-medium">Reddit</span>
                  <Button variant="outline" size="sm">Connect</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Dashboard Preferences */}
          <TabsContent value="dashboard" className="space-y-6 animate-fade-in">
            <Card className="glass border-border/50 hover:border-primary/30 transition-all duration-500 hover:shadow-xl">
              <CardHeader>
                <CardTitle>Dashboard Preferences</CardTitle>
                <CardDescription>Customize your analytics view</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="default-tab">Default Tab</Label>
                  <Select defaultValue="employer">
                    <SelectTrigger id="default-tab">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="employer">As an Employer</SelectItem>
                      <SelectItem value="insurance">As an Insurance Company</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="chart-type">Preferred Chart Type</Label>
                  <Select defaultValue="area">
                    <SelectTrigger id="chart-type">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="area">Area Chart</SelectItem>
                      <SelectItem value="line">Line Chart</SelectItem>
                      <SelectItem value="bar">Bar Chart</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="refresh-interval">Data Refresh Interval</Label>
                  <Select defaultValue="5">
                    <SelectTrigger id="refresh-interval">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1">1 minute</SelectItem>
                      <SelectItem value="5">5 minutes</SelectItem>
                      <SelectItem value="15">15 minutes</SelectItem>
                      <SelectItem value="30">30 minutes</SelectItem>
                      <SelectItem value="0">Manual only</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>

            <Card className="glass border-border/50 hover:border-secondary/30 transition-all duration-500 hover:shadow-xl">
              <CardHeader>
                <CardTitle>Advanced Options</CardTitle>
                <CardDescription>Developer and power user settings</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <Button variant="outline" className="w-full justify-start">
                  <Download className="w-4 h-4 mr-2" />
                  Export Dashboard Settings (JSON)
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Upload className="w-4 h-4 mr-2" />
                  Import Dashboard Settings
                </Button>
                <Button variant="outline" className="w-full justify-start text-destructive">
                  <Database className="w-4 h-4 mr-2" />
                  Clear Historical Data
                </Button>
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="debug-mode">Debug Mode</Label>
                    <p className="text-sm text-muted-foreground">Show API request logs</p>
                  </div>
                  <Switch id="debug-mode" />
                </div>
              </CardContent>
            </Card>

            <div className="flex justify-end">
              <Button onClick={handleSave} className="glow-primary">
                Save Preferences
              </Button>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Settings;
