using Microsoft.Owin;
using Monster.Framework.Abstractions.Infrastructure;
using Monster.Lexus.UI.SpaInfrastructure;
using Newtonsoft.Json.Linq;
using Owin;
using System;
using System.IO;
using System.Web.Hosting;
using System.Web.Http;
using System.Web.Mvc;
using System.Web.Routing;
using System.Collections.Generic;

[assembly: OwinStartup(typeof(Monster.Lexus.UI.Seeker.Startup))]
namespace Monster.Lexus.UI.Seeker
{
    public partial class Startup : OwinStartupBase
    {
        private class SpaRouting : ISpaRouting
        {
            public IDictionary<string, IDictionary<string, ChannelSpaRoute>> ChannelOverrides { get; set; }
            public ISet<string> Exclusions { get; set; }
        }

        protected override void ConfigureBootstrap(IContainer container)
        {
            var staticInfoService = container.Retrieve<IStaticInfoService>();
            switch (staticInfoService.RepositoryType)
            {
                case RepositoryType.Core:
                    Monster.Lexus.UI.Seeker.CoreRepositories.Bootstrapper.Init(container);
                    break;
                case RepositoryType.Proxy:
                    Monster.Lexus.UI.Seeker.ProxyRepositories.Bootstrapper.Init(container);
                    break;
                default:
                    throw new NotImplementedException();
            }
        }

        protected override void ConfigureRoutes(RouteCollection routes)
        {
            routes.MapMvcAttributeRoutes();

            routes.Add(new LegacyUrlRoute());

            routes.MapRoute(
                name: "JobViewContent",
                url: "jobs/{positionAdID}",
                defaults: new { controller = "JobViewContent", Action = "GetJob" }
            );
        }

        protected override ISpaRouting ConfigureSpaRouting()
        {
            var config = JObject.Parse(File.ReadAllText(HostingEnvironment.MapPath("~/channels.json")));
            var exclusions = (JArray)config["exclusions"];

            var routing = new SpaRouting
            {
                Exclusions = new HashSet<string>(),
                ChannelOverrides = new Dictionary<string, IDictionary<string, ChannelSpaRoute>>()
            };
            foreach (var exclusion in exclusions)
            {
                routing.Exclusions.Add(exclusion.ToString().ToLowerInvariant());
            }

            var configRouting = (JObject)config["routing"];
            foreach (var pair in configRouting)
            {
                if (!pair.Key.StartsWith("_"))
                {
                    var channelAlias = pair.Key.ToLowerInvariant();
                    var map = new Dictionary<string, ChannelSpaRoute>();
                    routing.ChannelOverrides.Add(channelAlias, map);

                    foreach (var childProperty in pair.Value.Children<JProperty>())
                    {
                        if (!childProperty.Name.StartsWith("_"))
                        {
                            var key = childProperty.Name.ToLowerInvariant();
                            var value = childProperty.Value.ToString();
                            if (string.IsNullOrEmpty(value))
                            {
                                map.Add(key, new ChannelSpaRoute { ExcludeMiniSpa = true });
                            }
                            else
                            {
                                map.Add(key, new ChannelSpaRoute { MiniSpaAliasOverride = value.ToLowerInvariant(), ExcludeMiniSpa = false });
                            }
                        }
                    }
                }
            }

            return routing;
        }

        public void Configuration(IAppBuilder app)
        {
            GlobalConfiguration.Configure(c =>
            {
                SpaConfiguration(c);
            });
        }
    }
}
