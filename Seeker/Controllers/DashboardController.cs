using Monster.Lexus.UI.SpaInfrastructure;
using System;
using System.Threading.Tasks;
using System.Web.Mvc;

namespace Monster.Lexus.UI.Seeker.Controllers
{
    public class DashboardController : GenericSpaController
    {
        private readonly IChannelInfoService _channelInfoService;

        public DashboardController(IBaseControllerService baseControllerService, IStaticInfoService staticInfoService, IChannelInfoService channelInfoService) :base(baseControllerService, staticInfoService)
        {
            if (channelInfoService == null)
            {
                throw new ArgumentNullException(nameof(channelInfoService));
            }

            _channelInfoService = channelInfoService;
        }

        [Route("dashboard")]
        public override async Task<ActionResult> Index()
        {
            var channelInfo = await _channelInfoService.GetChannelInfo(ControllerContext);

            string alternateDashBoardUrl = DashboardRedirector.GetAlternativeDashboardUrl(channelInfo.ChannelID, channelInfo.ApplicationID);
            if (!String.IsNullOrWhiteSpace(alternateDashBoardUrl))
            {
                ControllerContext.HttpContext.Response.Redirect(alternateDashBoardUrl, true);
                return null;
            }

            return await base.Index();
        }
    }
}

