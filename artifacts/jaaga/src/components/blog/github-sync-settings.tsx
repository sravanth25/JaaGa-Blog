import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { 
  Github, 
  RefreshCw, 
  CheckCircle2, 
  AlertTriangle, 
  ExternalLink, 
  Lock, 
  ChevronDown, 
  ChevronUp,
  HelpCircle,
  Download
} from "lucide-react";

export function GitHubSyncSettings() {
  const [isOpen, setIsOpen] = useState(false);
  const [isConfigured, setIsConfigured] = useState(false);
  const [repo, setRepo] = useState("");
  const [branch, setBranch] = useState("main");
  const [filePath, setFilePath] = useState("artifacts/api-server/data/posts.json");
  const [token, setToken] = useState("");
  const [loading, setLoading] = useState(false);
  const [syncing, setSyncing] = useState(false);
  const [pulling, setPulling] = useState(false);
  const [statusMessage, setStatusMessage] = useState("");
  const { toast } = useToast();

  const fetchConfig = async () => {
    try {
      const res = await fetch("/api/github-sync/config");
      const data = await res.json();
      if (data.configured) {
        setIsConfigured(true);
        setRepo(data.repo || "");
        setBranch(data.branch || "main");
        setFilePath(data.path || "artifacts/api-server/data/posts.json");
        setToken(data.token || "");
      } else {
        setIsConfigured(false);
      }
    } catch (err) {
      console.error("Failed to fetch Github integration config", err);
    }
  };

  useEffect(() => {
    fetchConfig();
  }, []);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!repo.trim() || !token.trim()) {
      toast({
        variant: "destructive",
        title: "Validation Error",
        description: "Please specify both your GitHub Access Token and Repository.",
      });
      return;
    }

    setLoading(true);
    setStatusMessage("Testing connection and committing posts.json back to your repository...");

    try {
      const res = await fetch("/api/github-sync/config", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          repo: repo.trim(),
          branch: branch.trim(),
          path: filePath.trim(),
          token: token.trim(),
        }),
      });

      const data = await res.json();
      if (res.ok && data.success) {
        setIsConfigured(true);
        setStatusMessage("");
        toast({
          title: "GitHub Sync Configured!",
          description: "Successfully connected to GitHub and performed a test database synchronization.",
        });
        fetchConfig();
      } else {
        setStatusMessage("");
        toast({
          variant: "destructive",
          title: "Sync Test Failed",
          description: data.details || data.error || "Failed to commit posts.json. Please ensure token permissions are correct.",
        });
      }
    } catch (err: any) {
      setStatusMessage("");
      toast({
        variant: "destructive",
        title: "Connection Error",
        description: err?.message || "An error occurred while talking to your backend.",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleForceSync = async () => {
    setSyncing(true);
    try {
      const res = await fetch("/api/github-sync/force-sync", { method: "POST" });
      const data = await res.json();
      if (res.ok && data.success) {
        toast({
          title: "GitHub Sync Succeeded",
          description: "Current posts.json database is now fully updated and committed on GitHub.",
        });
      } else {
        toast({
          variant: "destructive",
          title: "Synchronization Failed",
          description: data.error || "Failed to push current state back to GitHub.",
        });
      }
    } catch (err: any) {
      toast({
        variant: "destructive",
        title: "Sync Error",
        description: err?.message || "An unexpected error occurred.",
      });
    } finally {
      setSyncing(false);
    }
  };

  const handlePullSync = async () => {
    setPulling(true);
    try {
      const res = await fetch("/api/github-sync/pull", { method: "POST" });
      const data = await res.json();
      if (res.ok && data.success) {
        toast({
          title: "Successfully Pulled Live Blogs!",
          description: data.message || `Pulled down ${data.count} blogs from GitHub to your environment.`,
        });
        setTimeout(() => {
          window.location.reload();
        }, 1500);
      } else {
        toast({
          variant: "destructive",
          title: "Sync Pull Failed",
          description: data.error || "Failed to download database from GitHub.",
        });
      }
    } catch (err: any) {
      toast({
        variant: "destructive",
        title: "Pull Error",
        description: err?.message || "An unexpected error occurred.",
      });
    } finally {
      setPulling(false);
    }
  };

  return (
    <Card className={`border-l-4 transition-all duration-300 ${isConfigured ? 'border-l-emerald-500' : 'border-l-amber-500'}`}>
      <CardHeader className="pb-4">
        <div className="flex items-start justify-between">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <Github className="h-5 w-5 text-gray-800 dark:text-gray-100" />
              <CardTitle className="text-xl font-bold tracking-tight">GitHub Production Git-Sync</CardTitle>
              {isConfigured ? (
                <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-2.5 py-0.5 text-xs font-medium text-emerald-800 dark:bg-emerald-950 dark:text-emerald-100 border border-emerald-200">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  Active / Connected
                </span>
              ) : (
                <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-50 px-2.5 py-0.5 text-xs font-medium text-amber-800 dark:bg-amber-950 dark:text-amber-100 border border-amber-200">
                  <span className="h-1.5 w-1.5 rounded-full bg-amber-500" />
                  Ephemeral Mode
                </span>
              )}
            </div>
            <CardDescription className="text-sm">
              {isConfigured 
                ? `Syncing blog changes automatically to branch "${branch}" of repository "${repo}".` 
                : "Your serverless production deployment is currently in read-only / ephemeral mode. Configure Git-Sync to write posts back to GitHub."
              }
            </CardDescription>
          </div>
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={() => setIsOpen(!isOpen)}
            className="flex items-center gap-1"
          >
            {isOpen ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
            {isOpen ? "Collapse" : "Configure"}
          </Button>
        </div>

        {!isOpen && !isConfigured && (
          <div className="mt-2 rounded-md bg-amber-50 p-3.5 border border-amber-200 dark:bg-amber-950/40">
            <div className="flex gap-2">
              <AlertTriangle className="h-5 w-5 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
              <div className="text-xs text-amber-800 dark:text-amber-200 leading-relaxed">
                <strong>Attention: Permanent Posts Protection Alert</strong><br />
                Currently, blog posts are only saved to the ephemeral local disk. When Vercel or your hosting platform redeploys code or recycles instances, <strong>ALL new blog posts created here will be permanently deleted</strong> because the static codebase overrides it.
                <br />
                <button 
                  onClick={() => setIsOpen(true)} 
                  className="underline font-semibold mt-1 hover:text-amber-900 dark:hover:text-amber-1s"
                >
                  Configure GitHub Git-Sync now to prevent blogs from being deleted on production deployments &rarr;
                </button>
              </div>
            </div>
          </div>
        )}
      </CardHeader>

      {isOpen && (
        <CardContent className="border-t border-muted pt-6">
          <form onSubmit={handleSave} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="repo" className="font-semibold text-sm flex items-center gap-1">
                  GitHub Repository URL / Path
                  <span title="Format: username/repository-name">
                    <HelpCircle className="h-3.5 w-3.5 text-muted-foreground" />
                  </span>
                </Label>
                <Input 
                  id="repo" 
                  placeholder="e.g., sanasravanth25/jaa-ga-blog" 
                  value={repo}
                  onChange={(e) => setRepo(e.target.value)}
                  disabled={loading}
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="branch" className="font-semibold text-sm">Target Branch</Label>
                  <Input 
                    id="branch" 
                    placeholder="main" 
                    value={branch}
                    onChange={(e) => setBranch(e.target.value)}
                    disabled={loading}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="filePath" className="font-semibold text-sm">Database File Path</Label>
                  <Input 
                    id="filePath" 
                    placeholder="artifacts/api-server/data/posts.json" 
                    value={filePath}
                    onChange={(e) => setFilePath(e.target.value)}
                    disabled={loading}
                    required
                  />
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="token" className="font-semibold text-sm flex items-center gap-1">
                  GitHub Personal Access Token (PAT)
                  <Lock className="h-3.5 w-3.5 text-muted-foreground" />
                </Label>
                <a 
                  href="https://github.com/settings/tokens/new?description=JaaGa%20Blog%20Editor&scopes=repo" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-xs text-primary hover:underline flex items-center gap-1"
                >
                  Generate Token <ExternalLink className="h-3 w-3" />
                </a>
              </div>
              <Input 
                id="token" 
                type="password"
                placeholder={isConfigured ? "ghp_••••••••••••••••••••••••••••••••••••" : "Paste your ghp_... string here"}
                value={token}
                onChange={(e) => setToken(e.target.value)}
                disabled={loading}
                required
              />
              <p className="text-[11px] text-muted-foreground">
                Your token is stored securely directly in the app server environment. It is never logged or exposed. Requires "repo" scopes for Classic, or "Contents: Write" permissions for Fine-Grained tokens.
              </p>
            </div>

            <div className="rounded-md bg-muted p-4 space-y-2 text-xs text-muted-foreground">
              <h4 className="font-semibold text-foreground flex items-center gap-1">
                <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                How JaaGa Git-Sync Works (Two-Way Sync):
              </h4>
              <ol className="list-decimal pl-4 space-y-1.5 leading-relaxed">
                <li>Whenever you publish, update, or delete a blog post locally, JaaGa writes the updated list to local memory.</li>
                <li>Simultaneously, the server uses your token to commit the updated <strong>posts.json</strong> directly back to your GitHub repository.</li>
                <li>Your production hosting (like Vercel) sees the new commit on GitHub and triggers a fresh deploy automatically.</li>
                <li>Your posts are <strong>permanently protected and will never be deleted</strong> when you push codebase updates!</li>
                <li><strong className="text-foreground">Prevent Accidental Overwrites</strong>: If you author blogs on production, your local development files can become stale. To avoid overwriting live blogs when you push new code modifications from your local computer, run <strong>"Pull Live Blogs to Dev"</strong> or let JaaGa auto-fetch on dev-server startup.</li>
              </ol>
            </div>

            <div className="rounded-md bg-amber-50 dark:bg-amber-950/20 p-4 border border-amber-200/60 space-y-2 text-xs text-amber-900 dark:text-amber-200">
              <h4 className="font-semibold flex items-center gap-1 text-amber-800 dark:text-amber-300">
                <AlertTriangle className="h-4 w-4 text-amber-500" />
                CRITICAL FOR PRODUCTION (Vercel, Cloud Run, Netlify):
              </h4>
              <p className="leading-relaxed">
                Saving settings here writes a temporary <code>github-config.json</code> file to the server's disk. 
                On serverless platforms like Vercel or Cloud Run, the local disk is <strong>ephemeral</strong> and gets wiped clean on every redeployment, server restart, or container scale-down!
              </p>
              <p className="leading-relaxed font-semibold">
                To keep GitHub Sync permanently active so that n8n automated blogs never get lost, you MUST configure these Environment Variables in your hosting provider's dashboard (e.g. Vercel Project Settings):
              </p>
              <ul className="list-disc pl-4 space-y-1">
                <li><code>GITHUB_TOKEN</code> = <span className="font-mono">your_github_personal_access_token</span></li>
                <li><code>GITHUB_REPO</code> = <span className="font-mono">{repo || "your_username/your_repository_name"}</span></li>
                <li><code>GITHUB_BRANCH</code> = <span className="font-mono">{branch || "main"}</span></li>
                <li><code>GITHUB_PATH</code> = <span className="font-mono">{filePath || "artifacts/api-server/data/posts.json"}</span></li>
              </ul>
              <p className="leading-relaxed italic mt-1 text-[11px]">
                Once these environment variables are set in production, the Git-Sync module will stay active permanently across all restarts and redeployments automatically!
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
              <div className="text-sm text-yellow-600 font-medium">
                {statusMessage}
              </div>
              <div className="flex gap-2 w-full sm:w-auto shrink-0 justify-end">
                {isConfigured && (
                  <>
                    <Button 
                      type="button" 
                      variant="outline" 
                      onClick={handlePullSync}
                      disabled={pulling || syncing || loading}
                      className="flex items-center gap-1.5 border-emerald-200 hover:bg-emerald-50 text-emerald-700 dark:text-emerald-400 dark:hover:bg-emerald-950"
                      title="Pull latest live blog posts from GitHub into your development database"
                    >
                      <Download className={`h-4 w-4 ${pulling ? 'animate-bounce' : ''}`} />
                      Pull Live Blogs to Dev
                    </Button>
                    <Button 
                      type="button" 
                      variant="outline" 
                      onClick={handleForceSync}
                      disabled={pulling || syncing || loading}
                      className="flex items-center gap-1.5"
                      title="Force upload/overwrite live posts database on GitHub with your local data"
                    >
                      <RefreshCw className={`h-4 w-4 ${syncing ? 'animate-spin' : ''}`} />
                      Push to Live
                    </Button>
                  </>
                )}
                <Button 
                  type="submit" 
                  disabled={loading}
                  className="flex items-center gap-1.5"
                >
                  {loading && <RefreshCw className="h-4 w-4 animate-spin" />}
                  Save & Validate Sync
                </Button>
              </div>
            </div>
          </form>
        </CardContent>
      )}
    </Card>
  );
}
