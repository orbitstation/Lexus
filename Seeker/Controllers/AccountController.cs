using Monster.Lexus.UI.SpaInfrastructure;
using System.Threading.Tasks;
using System.Web.Mvc;

namespace Monster.Lexus.UI.Seeker.Controllers
{
    public class AccountController : BaseController
    {
        public AccountController(IBaseControllerService baseControllerService) : base(baseControllerService)
        {
        }

        [HttpGet]
        public async Task<ActionResult> Impersonate(string auth)
        {
            var model = await CreateModel<AngularModel>();
            return View(model);
        }

        [HttpGet]
        public Task<ActionResult> LoginCallback()
        {
            return Task.FromResult((ActionResult)View());
        }

        [HttpGet]
        public Task<ActionResult> RenewCallback()
        {
            return Task.FromResult((ActionResult)View());
        }

        [HttpGet]
        public async Task<ActionResult> Index()
        {
            var model = await CreateModel<AngularModel>();
            return View(model);
        }
    }
}