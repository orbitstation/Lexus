using Monster.Lexus.UI.SpaInfrastructure;
using System;
using System.Threading.Tasks;
using System.Web.Mvc;


namespace Monster.Lexus.UI.Seeker.Controllers
{
    public class HomeController : GenericSpaController
    {
        private readonly IChannelInfoService _channelInfoService;

        public HomeController(IBaseControllerService baseControllerService, IStaticInfoService staticInfoService, IChannelInfoService channelInfoService) :base(baseControllerService, staticInfoService)
        {
            if (channelInfoService == null)
            {
                throw new ArgumentNullException(nameof(channelInfoService));
            }

            _channelInfoService = channelInfoService;
        }

        [Route("")]
        [Route("home")]
        public override async Task<ActionResult> Index()
        {
            var channelInfo = await _channelInfoService.GetChannelInfo(ControllerContext);

            string alternateDashBoardUrl = DashboardRedirector.GetAlternativeDashboardUrl(channelInfo.ChannelID, channelInfo.ApplicationID);
            if (!String.IsNullOrWhiteSpace(alternateDashBoardUrl))
            {
                ControllerContext.HttpContext.Response.Redirect(alternateDashBoardUrl, true);
                return null;
            }

            ControllerContext.RouteData.DataTokens.Add("Spa", "Home");
            return await base.Index();
        }
    }
}
