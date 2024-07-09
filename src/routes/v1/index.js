const express = require('express');
const router = express.Router();
const {officialController,domainController,resourceController,projectController,contactForumController,NewsController,TestimonialController,UserProfileController,EventController,LeaderBoardController} = require('../../controller/index.js');
const checkDuplicateEmail = require('../../middlewares/checkDuplicateEmail');
const {Leaderboard}=require('../../models/index.js')
const { signup,login,verify,passwordResetLink,updatePassword} =require('../../controller/user-controller.js');
const {UserService}=require('../../services/index.js');


//leaderboard........

router.post('/leaderboard', (req, res) => LeaderboardController.createLeaderboardEntry(req, res));
router.get('/leaderboard/weekly', pagination(Leaderboard), (req, res) => LeaderBoardController.getWeeklyLeaderboard(req, res));
router.get('/leaderboard/monthly', pagination(Leaderboard), (req, res) => LeaderBoardController.getMonthlyLeaderboard(req, res));
router.get('/leaderboard/overall', pagination(Leaderboard), (req, res) => LeaderBoardController.getOverallLeaderboard(req, res));
router.put('/leaderboard/:id', (req, res) => LeaderBoardController.updateLeaderboardEntry(req, res));
router.delete('/leaderboard/:id', (req, res) => LeaderBoardController.deleteLeaderboardEntry(req, res));
// News routes
router.get('/news', NewsController.getAllNews);
router.get('/news/by/:id', NewsController.getNewsById);
router.post('/create/news', NewsController.createNews);
router.put('/update/news/:id', NewsController.updateNews);
router.delete('/delete/news/:id', NewsController.deleteNews);

// Testimonials routes
router.get('/testimonials', TestimonialController.getAllTestimonials);
router.get('/testimonials/by/:id', TestimonialController.getTestimonialById);
router.post('/testimonials/create', TestimonialController.createTestimonial);
router.put('/testimonials/update/:id', TestimonialController.updateTestimonial);
router.delete('/testimonials/delete/:id', TestimonialController.deleteTestimonial);

// User Profile routes
router.get('/profiles', UserProfileController.getAllUserProfiles);
router.get('/profiles/:id', UserProfileController.getUserProfileById);
router.post('/profiles/create', UserProfileController.createUserProfile);
router.put('/profiles/update/:id', UserProfileController.updateUserProfile);
router.delete('/profiles/delete/:id', UserProfileController.deleteUserProfile);



const userService=new UserService();

//event Routes...
router.post('/events', EventController.createEvent);
router.get('/events', EventController.getAllEvents);
router.get('/events/:id', EventController.getEventById);
router.put('/events/:id', EventController.updateEvent);
router.delete('/events/:id', EventController.deleteEvent);


//Domain Routes
router.post('/domain', (req, res) => domainController.createDomain(req, res));
router.get('/domains', (req, res) => domainController.getAllDomains(req, res));
router.get('/domain/:id', (req, res) => domainController.getDomainById(req, res));
router.put('/domain/:id', (req, res) => domainController.updateDomain(req, res));
router.delete('/domain/:id', (req, res) => domainController.deleteDomain(req, res));


//User Routes:
router.post('/signup',signup);
router.post('/login',login);
router.get('/verify/:token',verify);
router.get('/forgot/password',passwordResetLink);
router.patch('/reset/password/:token',updatePassword);

//Officials Routes:
router.post('/officials',checkDuplicateEmail,officialController.createOfficial);
router.get('/officials', officialController.getAllOfficials);
router.get('/officials/:id', officialController.getOfficialById);
router.put('/officials/:id', officialController.updateOfficial);
router.delete('/officials/:id', officialController.deleteOfficial);



// Rewsources Routes
router.post('/resource', (req, res) => resourceController.createResource(req, res));
router.get('/resources', (req, res) => resourceController.getAllResources(req, res));
router.get('/resource/:id', (req, res) => resourceController.getResourceById(req, res));
router.get('/resource/:domainId', (req, res) => resourceController.getResourcesByDomain(req, res));
router.put('/resource/:id', (req, res) => resourceController.updateResource(req, res));
router.delete('/resource/:id', (req, res) => resourceController.deleteResource(req, res));

//Project Routes
router.post('/project', projectController.createProject);
router.get('/projects', projectController.getAllProjects);
router.get('/project/:id', projectController.getProjectById);
router.put('/project/:id', projectController.updateProject);
router.delete('/project/:id', projectController.deleteProject);
router.get('/project/:domainId', projectController.findProjectsByDomain);

//ContactForum Routes
router.post('/contact-forum', contactForumController.createContactForum);
router.get('/contact-forums', contactForumController.getAllContactForums);
router.get('/contact-forum/:id', contactForumController.getContactForumById);
router.put('/contact-forum/:id', contactForumController.updateContactForum);
router.delete('/contact-forum/:id', contactForumController.deleteContactForum);
router.get('/contact-forums/:domainId', contactForumController.getAllContactForumsByDomain);

module.exports = router;
