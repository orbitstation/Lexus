using Monster.Lexus.Services.Core.Contracts.Repositories;
using Monster.Lexus.Services.Seeker.Contracts.Repositories;
using Monster.Lexus.UI.SpaInfrastructure;
using System;
using System.Threading.Tasks;
using System.Web.Http;

namespace Monster.Lexus.UI.Seeker.Controllers
{
    public class JobViewContentController : BaseController
    {
        private readonly IJobViewContentRepository _jobViewContentRepository;
        private readonly ILexusChannelInfoRepository _lexusChannelInfoRepository;
        private readonly IChannelInfoService _channelInfoService;

        public JobViewContentController(IBaseControllerService baseControllerService, IChannelInfoService channelInfoService, IJobViewContentRepository jobViewContentRepository, ILexusChannelInfoRepository lexusChannelInfoRepository) : base(baseControllerService)
        {
            if (jobViewContentRepository == null)
            {
                throw new ArgumentNullException(nameof(jobViewContentRepository));
            }
            if (lexusChannelInfoRepository == null)
            {
                throw new ArgumentNullException(nameof(lexusChannelInfoRepository));
            }

            _channelInfoService = channelInfoService;
            _jobViewContentRepository = jobViewContentRepository;
            _lexusChannelInfoRepository = lexusChannelInfoRepository;
        }

        [HttpGet]
        public async Task<string> GetJob(int positionAdID)
        {
            var channelInfo = await _channelInfoService.GetChannelInfo(ControllerContext);
            _lexusChannelInfoRepository.Set(new Lazy<ILexusChannelInfoProvider>(() => channelInfo));
            string html = await _jobViewContentRepository.GetJobHtml(positionAdID, channelInfo.ChannelID).ConfigureAwait(false);
            return html;
        }
    }
}
