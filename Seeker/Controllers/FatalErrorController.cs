using Monster.Lexus.UI.SpaInfrastructure;
using Monster.GlobalFramework.Internationalization.Translations;
using System;
using System.Threading.Tasks;
using System.Web.Mvc;

namespace Monster.Lexus.UI.Seeker.Controllers
{
    public class FatalErrorController : Controller
    {
        private readonly IChannelInfoService _channelInfoService;

        public FatalErrorController(IBaseControllerService baseControllerService, IStaticInfoService staticInfoService, IChannelInfoService channelInfoService) 
        {
            if (channelInfoService == null)
            {
                throw new ArgumentNullException(nameof(channelInfoService));
            }

            _channelInfoService = channelInfoService;
        }

        // GET: Fatal
        [Route("fatalerror")]
        public async Task<ActionResult> Index()
        {
            var channelInfo = await _channelInfoService.GetChannelInfo(ControllerContext);

            ViewBag.Title = Messages.GetMessageText(channelInfo.ChannelID, 373264);

            ViewBag.HeadContent = Messages.GetMessageText(channelInfo.ChannelID, 373266); 

            ViewBag.BodyContent = Messages.GetMessageText(channelInfo.ChannelID, 373265);

            return View();
        }
    }
}