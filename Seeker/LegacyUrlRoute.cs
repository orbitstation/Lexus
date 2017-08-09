using System;
using System.Collections.Specialized;
using System.Linq;
using System.Net;
using System.Text;
using System.Web;
using System.Web.Routing;

namespace Monster.Lexus.UI.Seeker
{
    public class LegacyUrlRoute : RouteBase
    {
        public override RouteData GetRouteData(HttpContextBase httpContext)
        {
            const string status = "301 Moved Permanently";
            var request = httpContext.Request;
            var response = httpContext.Response;
            var legacyUrl = request.Url.ToString();
            var newUrl = "";

            // Resumes
            if (legacyUrl.ToLower().Contains("resume/listresumes.aspx"))
            {
                newUrl = "/Resumes";
            }
            // Cover letters
            else if (legacyUrl.ToLower().Contains("letters/coverletters.aspx"))
            {
                newUrl = "/CoverLetters";
            }
            // Apply history
            else if (legacyUrl.ToLower().Contains("account/applyhistory.aspx"))
            {
                newUrl = "/ApplicationHistory";
            }
            // Saved jobs
            else if (legacyUrl.ToLower().Contains("jobfile/jobfile.aspx"))
            {
                newUrl = "/SavedJobs";
            }
            // Search agents - modify
            else if (legacyUrl.ToLower().Contains("agents/modifyjobagent.aspx"))
            {
                if (request.QueryString["agentid"] != null)
                {
                    newUrl = String.Format("/SavedSearches/edit/{0}", request.QueryString["agentid"]);
                }
                else
                {
                    newUrl = String.Format("/SavedSearches/{0}", request.QueryString.ToString());
                }
            }
            // Search agents
            else if (legacyUrl.ToLower().Contains("agents/managejobagents.aspx"))
            {
                newUrl = "/SavedSearches";
            }
            // Job search
            // https://jobs.military.com/jobsearch/powersearch.aspx?q=java&jt=2&rad=20&where=Boston%2c+MA&ssname=legacy+search&ssid=141195297
            else if (legacyUrl.ToLower().Contains("jobsearch/powersearch.aspx"))
            {
                var sb = new StringBuilder();
                char delimiter = '/';
                string what = "";
                string where = "";
                string ssid = "";
                if (!String.IsNullOrWhiteSpace(request.QueryString["jt"]))
                {
                    string jobType = "job-type-0." + request.QueryString["jt"];
                    sb.Append(delimiter + jobType);
                }
                if (!String.IsNullOrWhiteSpace(request.QueryString["dateposted"]))
                {
                    string datePosted = String.Format("date-posted-last-{0}-days", request.QueryString["dateposted"]);
                    sb.Append(delimiter + datePosted);
                }
                if (!String.IsNullOrWhiteSpace(request.QueryString["rad"]))
                {
                    string radius = String.Format("radius-{0}-miles", request.QueryString["rad"]);
                    sb.Append(delimiter + radius);
                }
                if (!String.IsNullOrWhiteSpace(request.QueryString["ssid"]))
                {
                    ssid = String.Format("&agentID={0}", request.QueryString["ssid"]);
                }
                if (!String.IsNullOrWhiteSpace(request.QueryString["q"]))
                {
                    what = "&keywords=" + WebUtility.UrlEncode(request.QueryString["q"]);
                }
                if (!String.IsNullOrWhiteSpace(request.QueryString["where"]))
                {
                    where = "&location=" + WebUtility.UrlEncode(request.QueryString["where"]);
                }

                newUrl = String.Format("/JobSearch/jobs{0}?{1}{2}{3}", sb.ToString(), ssid, where, what);
            }
            // Job view
            else if (legacyUrl.ToLower().Contains("getjob.aspx"))
            {
                //MGSMIL-385: preserve the querystring so it can be passed along
                NameValueCollection qsParams = new NameValueCollection(request.QueryString);
                qsParams.Remove("jobid");
                qsParams.Remove("jobtitle");
                qsParams.Remove("postingid");
                string q = String.Join("&", qsParams.AllKeys.Select(a => HttpUtility.UrlEncode(a) + "=" + HttpUtility.UrlEncode(qsParams[a])));

                if (!String.IsNullOrWhiteSpace(request.QueryString["jobid"]))
                {
                    string jobTitle = request.QueryString["jobtitle"] ?? "missing-title";
                    jobTitle = jobTitle.Replace(' ', '-').ToLower();
                    newUrl = String.Format("/jobview/{0}-id-core-{1}?{2}", HttpUtility.UrlEncode(jobTitle), request.QueryString["jobid"], q);
                }
                else if (!String.IsNullOrWhiteSpace(request.QueryString["postingid"]))
                {
                    string jobTitle = request.QueryString["jobtitle"] ?? "missing-title";
                    jobTitle = jobTitle.Replace(' ', '-').ToLower();
                    newUrl = String.Format("/jobview/{0}-id-cloud-{1}?{2}", HttpUtility.UrlEncode(jobTitle), request.QueryString["postingid"], q);
                }
                else
                {
                    // TODO: what now?
                }
            }
            else
            {
                return null;
            }
            response.Status = status;
            response.RedirectLocation = newUrl;
            response.End();
            return null;
        }

        public override VirtualPathData GetVirtualPath(RequestContext requestContext, RouteValueDictionary values)
        {
            return null;
        }
    }
}