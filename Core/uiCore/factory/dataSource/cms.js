(function (angular) {
    "use strict";
    angular.module('globalApp').service('cmsFactory', function () {
        return {
            get: function () {
                //console.log('cms Factory1.');
                return {

                    // __________________________________________________
                    //  this is still under cunstruction -mb

                    cmsMultiPage: [
                        {
                            "pageInfo": {
                                "pageName": 'Youth-Page',
                                //"Status": 'Archived',
                                "Status": 'Draft',
                                "hasMenuItem": true,
                                "metaTags": 'Youth, Information, Jobs',
                                "navChannel": 1,
                                "navPlacement": 1,
                                "notes": ''
                            }
                        },
                        {
                            "name": "cms-topBanner",
                            "meta": {
                                "title": "WIOA Youth",
                                "p": "An overview of WIOA and the WIOA youth programs is a potential option in a custom youth portal but all sections and content are customizable within our template.",
                                "img": "http://astanatimes.com/wp-content/uploads/2016/04/youthDev.jpg"
                            }
                        },
                        {
                            "name": "cms-ScrollSpy",
                            "colsm": "12",
                            "meta": {
                                "items": [
                                    {
                                        "title": "Overview of WIOA and Youth Services",
                                        "rightBox": {
                                            "title": "Download the Fact Sheet",
                                            "paragraphs": [
                                                { "p": "<a href='https://www.doleta.gov/wioa/Docs/WIOA_YouthProgram_FactSheet.pdf'>WIOA_YouthProgram_FactSheet.pdf</a>" }
                                            ]
                                        },
                                        "paragraphs": [
                                            { "p": "<p>The Workforce Innovation and Opportunity Act (WIOA) was signed into law in July 2014, replacing the Workforce Investment Act (WIA). One of the most important changes under WIOA is an increase in funding from 30% to 75% to provide services for out-of-school youth up to age 24 with continued funding for programs of in-school youth up to age 21.</p>\n<p>What types of programs might be available to you? Eligible program participants may receive a range of services from the following areas:</p>\n<ul>\n<li>Occupational Skills Training</li>\n<li>Career Counseling</li>\n<li>Internships</li>\n<li>Job Placements</li>\n<li>Mentoring</li>\n<li>Tutoring</li>\n<li>Leadership Development</li>\n<li>Financial Literacy</li>\n<li>Entrepreneurial Skills Training</li>\n<li>Local Labor Market &amp; Employment Information Services</li>\n<li>Post-secondary Education and Training Transition Support</li>\n<li>Alternative Education and Drop Out Recovery Support</li>\n<li>Workforce Preparation and Training for Specific Career Clusters</li>\n<li>Additional Support Services such as Counseling</li>\n</ul>\n<p>&nbsp;</p>\n<p>The <strong>Eligibility and Application</strong> link on the left will give you detailed information on whether you are eligible for services and how you can apply in your local area.</p>" },
                                        ]
                                    },
                                    {
                                        "title": "Eligibility and Application",
                                        "rightBox": {
                                            "title": "Image or links",
                                            "paragraphs": [
                                                { "p": "<a href=\"\">Download PDF</a><br><a href=\"\">Link to new site</a><br><a href=\"\">Link to new site</a>" }
                                            ]
                                        },
                                        "paragraphs": [
                                            { "p": "<p>WIOA youth programs prepare eligible young people, ages 14 to 24, for success in school and at work. Those meeting eligibility requirements are assessed to determine academic, skill level, and support service needs. Strategies are developed for each person based on the assessment results. They may receive a wide array of services including counseling, tutoring, job training, mentoring, or work experience. Other program services include summer employment, study skills training, or instruction in obtaining a GED or equivalent.</p>\n<p><strong>Eligibility Requirements for Out-of-School Services</strong></p>\n<ol>\n<li>Be aged 14 to 24 and not attending school</li>\n<li>Individuals into one of more of the following categories</li>\n<ul>\n<li>Has a disability</li>\n<li>Has dropped out of school</li>\n<li>Has not attended school for the most recent and completed school calendar quarter</li>\n<li>Has completed high school but has basic skills deficiency</li>\n<li>Is an English language learner</li>\n<li>Is an offender</li>\n<li>Is homeless, a runaway, and/or a foster child</li>\n<li>Is pregnant or parenting</li>\n<li>Is low-income* and requires additional assistance to start or complete and education program or to secure/hold employment</li>\n</ul>\n</ol>\n<p><strong>Eligibility Requirements for In-School Services</strong></p>\n<ol>\n<li>Be aged 14 to 21 and attending school (individuals with disabilities can be under 14)</li>\n<li>Individuals into one of more of the following categories</li>\n<ul>\n<li>Has a disability</li>\n<li>Has a basic skills deficiency</li>\n<li>Is an English language learner</li>\n<li>Is an offender</li>\n<li>Is homeless, a runaway, and/or a foster child</li>\n<li>Is pregnant or parenting</li>\n<li>Is low-income* and requires additional assistance to start or complete and education program or to secure/hold employment</li>\n</ul>\n</ol>\n<p>*Low-income is determined generally under WIOA using the Lower Living Standard Income Level (LLSIL). Earnings less than 70% of the LLSIL meeting the definition but our program's workers can help determine your income level and elgibility in this area.</p>\n<p><strong>How to Apply</strong></p>\n<p>This area would be used to put in specific application instructions for your state or local area or could be a simple hyperlink to a specific work force center or general work force center listing.</p>" }
                                        ]
                                    },
                                    {
                                        "title": "Exploring Careers",
                                        "paragraphs": [
                                            { "p": "<p>Deciding on a career path can be daunting and many feel pressure to pick a career early in their life. However, according to the Bureau of Labor Statistics, people will change jobs on average 12 times in their life. So when you are young, you should explore many different options including taking an inventory of your interests and passions and the kind of lifestyle you want for yourself. These types of assessments and information can help inform your next step such as college, the military, or local or national service.</p>\n<p>Below we have listed some resources to get you started in exploring your interests and possible career matches</p>\n<ul>\n<li><a href=\"http://my.mgsdemo.monster.com/careerprofile/careerprofile.aspx\">Career Profile</a> - Our site's career assessment tool is a simple 60 question interest survey. When completed, our tool will give you a profile of your interests with the ability to view matching career profiles.</li>\n<li><a href=\"http://my.mgsdemo.monster.com/OccupationSearch/OccupationSearch.aspx\">Occupation Search</a> - Our site's occupation search tool allows you to search and compare thousands of career profiles by industry, keyword, military occupation code, or by your career profile assessment results.</li>\n<li><a href=\"http://my.mgsdemo.monster.com/microsite/Content.aspx?appid=MGSDEMO&amp;pageType=simple&amp;seo=mst\">Military Skills Translator</a> - Our own Military Skills Translator allows those separating from the military or interested in careers after the military to match military occupation skills to civilian careers.</li>\n<li><a href=\"http://www.careeronestop.org/Videos/default.aspx\" target=\"_blank\">Career and Industry Videos</a> - The Department of Labor's CareerOneStop service provides hundreds of career, skills, and industry exploration videos for you to get a taste of potential careers and industries</li>\n</ul>" }
                                        ]
                                    },
                                    {
                                        "title": "Your Path to College",
                                        "paragraphs": [
                                            { "p": "<p>Deciding to attend college and then figuring out where to go and how much it will cost are big and often stressful decisions! College provides a big step up on the economic ladder of your future and is a chance to study a variety of subjects and put you on the path to a new career. But college is not just for graduating high school students! According to the Department of Education, 30% of all college students started at age 25 or older. With full time and part time options, scholarships and financial aid, thousands courses and professional and technical career paths, there are opportunities and options for everyone.</p>\n<h5>Finding a School</h5>\n<p>Below we have listed just some of the local and national resources available for finding the school that best fits your needs and interests.</p>\n<ul>\n<li><a href=\"https://collegescorecard.ed.gov/\" target=\"_blank\">College Scorecard</a> - The Department of Education has compiled thousands of data points from all US degree granting institutions and gives students the ability to compare school performance. Each Scorecard includes five key pieces of data about a college: costs, graduation rate, loan default rate, average amount borrowed, employment after graduating, and average salary after graduating</li>\n<li><a href=\"http://www.fastweb.com/\" target=\"_blank\">FastWeb</a> - FastWeb is a free, comprehensive online resource for searching schools and programs as well as financial aid and scholarships.</li>\n<li>Monster Recommendation - [content and link to a state's approved education providers or state provider search on this portal if available]</li>\n<li>Monster Recommendation - [content and link to information about technical schools in the state]</li>\n<li>Monster Recommendation - [content and link to information about community colleges in the state]</li>\n</ul>\n<h5>Paying for School</h5>\n<p>Below we have listed just some of the local and national resources available for paying for school.</p>\n<ul>\n<li><a href=\"https://fafsa.ed.gov/index.htm\" target=\"_blank\">Federal Student Aid (FAFSA)</a> - The free Federal FAFSA form is required by most education institutions if you require any sort of aid including need based scholarships. This site helps you through the process of filing out the form and gives you an early estimate on your eligibility for Federal student aid (both loans and grants)</li>\n<li><a href=\"http://www.finaid.org/\" target=\"_blank\">FinAid</a> - The SmartStudent Guide to Financial Aid, is one of the most comprehensive free resources for information, advice, and tools about student financial aid, college scholarships, and education loans.</li>\n<li><a href=\"http://www.fastweb.com/\" target=\"_blank\">FastWeb</a> - FastWeb is a free, comprehensive online resource for searching schools and programs as well as financial aid and scholarships.</li>\n<li>Monster Recommendation - [content and link to local scholarship or aid resources]</li>\n</ul>" }
                                        ]
                                    },
                                    {
                                        "title": "State and local programs",
                                        "paragraphs": [
                                            { "p": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce vestibulum vel purus ut consequat. Donec scelerisque, urna ut interdum vehicula, ligula ante congue mauris, id placerat massa leo id felis. Aliquam erat volutpat." }
                                        ]
                                    },
                                    {
                                        "title": "Military",
                                        "rightBox": {
                                            "title": "DOL WIOA Youth Fact Sheet",
                                            "paragraphs": [
                                                {
                                                    "p": "<a href=\"\">Download PDF</a>"
                                                }
                                            ]
                                        },
                                        "paragraphs": [
                                            { "p": "<h3>Youth Job Seeker Resources</h3>\n<p><img src=\"https://securemedia.newjobs.com/ID/mgs/10033/youth/youth-eligibility-application.jpg\" alt=\"image of youth\" /></p>\n<p>WIOA youth programs prepare eligible young people, ages 14 to 24, for success in school and at work. Those meeting eligibility requirements are assessed to determine academic, skill level, and support service needs. Strategies are developed for each person based on the assessment results. They may receive a wide array of services including counseling, tutoring, job training, mentoring, or work experience. Other program services include summer employment, study skills training, or instruction in obtaining a GED or equivalent.</p>\n<p><strong>Eligibility Requirements for Out-of-School Services</strong></p>\n<ol>\n<li>Be aged 14 to 24 and not attending school</li>\n<li>Individuals into one of more of the following categories</li>\n<ul>\n<li>Has a disability</li>\n<li>Has dropped out of school</li>\n<li>Has not attended school for the most recent and completed school calendar quarter</li>\n<li>Has completed high school but has basic skills deficiency</li>\n<li>Is an English language learner</li>\n<li>Is an offender</li>\n<li>Is homeless, a runaway, and/or a foster child</li>\n<li>Is pregnant or parenting</li>\n<li>Is low-income* and requires additional assistance to start or complete and education program or to secure/hold employment</li>\n</ul>\n</ol>\n<p><strong>Eligibility Requirements for In-School Services</strong></p>\n<ol>\n<li>Be aged 14 to 21 and attending school (individuals with disabilities can be under 14)</li>\n<li>Individuals into one of more of the following categories</li>\n<ul>\n<li>Has a disability</li>\n<li>Has a basic skills deficiency</li>\n<li>Is an English language learner</li>\n<li>Is an offender</li>\n<li>Is homeless, a runaway, and/or a foster child</li>\n<li>Is pregnant or parenting</li>\n<li>Is low-income* and requires additional assistance to start or complete and education program or to secure/hold employment</li>\n</ul>\n</ol>\n<p>*Low-income is determined generally under WIOA using the Lower Living Standard Income Level (LLSIL). Earnings less than 70% of the LLSIL meeting the definition but our program's workers can help determine your income level and elgibility in this area.</p>\n<p><strong>How to Apply</strong></p>\n<p>This area would be used to put in specific application instructions for your state or local area or could be a simple hyperlink to a specific work force center or general work force center listing.</p>" },
                                        ]
                                    },
                                    {
                                        "title": "National Service and Job Training",
                                        "rightBox": {
                                            "title": "Image or links",
                                            "paragraphs": [
                                                {
                                                    "p": "<a href=\"\">Download PDF</a><br><a href=\"\">Link to new site</a><br><a href=\"\">Link to new site</a>"
                                                }
                                            ]
                                        },
                                        "paragraphs": [
                                            {
                                                "p": "<p>National service and job training programs offer a great potential option to young people who aren't sure what they want to do next or want to gain skills and hands on experience before starting their careers. Some programs allow young people to serve their communities at nationally or internationally or gain direct, hands on job and skills training locally.</p>\n<p>Below we have listed some resources to start exploring the options available to you.</p>\n<ul>\n<li><a href=\"http://www.americorps.gov/\" target=\"_blank\">AmeriCorps</a> - AmeriCorps, and its various programs such as AmeriCorps NCCC and AmeriCorps VISTA, offer you the chance to gain skills, experience, and money for future education or repayment of loans through a variety of different community, disaster response, and travel programs throughout the country. AmeriCorps members receive a living allowance and health insurance during their terms of service.</li>\n<li><a href=\"http://www.peacecorps.gov/\" target=\"_blank\">Peace Corps</a> - As the preeminent international service organization of the United States, the Peace Corps sends Americans abroad to tackle the most pressing needs of people around the world while giving its volunteers new skills and experiences to take into their careers. Volunteers received a monthly living and housing allowance, a \"readjustment\" allowance payment at the completion of their service, and potential eligibility for loan forgiveness or partial cancellation by your student loan lender.</li>\n<li><a href=\"http://www.jobcorps.gov/home.aspx\" target=\"_blank\">Job Corps</a> - Job Corps is the nation's largest training program for at-risk youth ages 16-24 with centers nationwide. Job Corps members receive free academic, vocational, and life skills and includes rooms, board, health insurance, living allowances, and job placement assistance.</li>\n</ul>\n<p><strong>Eligibility Requirements for Out-of-School Services</strong></p>\n<ol>\n<li>Be aged 14 to 24 and not attending school</li>\n<li>Individuals into one of more of the following categories</li>\n<ul>\n<li>Has a disability</li>\n<li>Has dropped out of school</li>\n<li>Has not attended school for the most recent and completed school calendar quarter</li>\n<li>Has completed high school but has basic skills deficiency</li>\n<li>Is an English language learner</li>\n<li>Is an offender</li>\n<li>Is homeless, a runaway, and/or a foster child</li>\n<li>Is pregnant or parenting</li>\n<li>Is low-income* and requires additional assistance to start or complete and education program or to secure/hold employment</li>\n</ul>\n</ol>\n<p><strong>Eligibility Requirements for In-School Services</strong></p>\n<ol>\n<li>Be aged 14 to 21 and attending school (individuals with disabilities can be under 14)</li>\n<li>Individuals into one of more of the following categories</li>\n<ul>\n<li>Has a disability</li>\n<li>Has a basic skills deficiency</li>\n<li>Is an English language learner</li>\n<li>Is an offender</li>\n<li>Is homeless, a runaway, and/or a foster child</li>\n<li>Is pregnant or parenting</li>\n<li>Is low-income* and requires additional assistance to start or complete and education program or to secure/hold employment</li>\n</ul>\n</ol>\n<p>*Low-income is determined generally under WIOA using the Lower Living Standard Income Level (LLSIL). Earnings less than 70% of the LLSIL meeting the definition but our program's workers can help determine your income level and elgibility in this area.</p>\n<p><strong>How to Apply</strong></p>\n<p>This area would be used to put in specific application instructions for your state or local area or could be a simple hyperlink to a specific work force center or general work force center listing.</p>"
                                            }
                                        ]
                                    },
                                    {
                                        "title": "State and Local Programs and Services",
                                        "paragraphs": [
                                            { "p": "<h3 class=\"no-top-margin\">State and Local Programs and Services</h3>\n<p><img src=\"https://securemedia.newjobs.com/id/mgs/9976/farm-info.jpg\" alt=\"\" /></p>\n<p>Your state and local area's programs and services content would go here. Content could be detailed or a simple bulleted list with hyperlinks as an example shown below.</p>\n<h5>Here is a list:</h5>\n<ul>\n<li>Content A</li>\n<li>Content B</li>\n<li>Content C</li>\n<li>Content D</li>\n</ul>\n<p>To learn more, visit a <a href=\"https://my.mgsdemo.monster.com/microsite/Content.aspx?appid=MGSYOUTH&amp;pageType=simple&amp;seo=state_local_programs\" target=\"_blank\">Your hyperlink of choice</a> today</p>" }
                                        ]
                                    },
                                ]
                            }
                        }
                    ]


                    // _________________________________________________

                }
            }
        }
    });
})(angular);
















