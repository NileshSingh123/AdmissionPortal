const CourseModel = require("../model/Course");
const nodemailer = require("nodemailer");

class CourseController {
  static courseinsert = async (req, res) => {
    try {
      // console.log(req.body)
      const id = req.params.id;
      const clientEmail = req.body.email;
      const course = req.body.course;
      const { _id } = req.user;

      const result = new CourseModel({
        name: req.body.name,
        email: req.body.email,
        mobile_number: req.body.mobile_number,
        address: req.body.address,
        gender: req.body.gender,
        course: req.body.course,
        qualification: req.body.qualification,
        user_id: _id,
      });
      await result.save();
      this.sendEmail(course, clientEmail);
      req.flash("success", "Course Registration Successfully !");
      res.redirect("/course_display");
    } catch (error) {
      console.log(error);
    }
  };

  static Course_display = async (req, res) => {
    try {
      const { name, email, id, image } = req.user;
      const data = await CourseModel.find({ user_id: req.user.id });
      //console.log(data);
      res.render("course/display", {
        d: data,
        n: name,
        i: image.url,
        e: email,
        message: req.flash("success"),
      });
    } catch (error) {
      console.log(error);
    }
  };

  static Course_view = async (req, res) => {
    try {
      const { name, email, id, image } = req.user;
      //console.log(req.params.id)
      const data = await CourseModel.findById(req.params.id);
      //console.log(data);
      res.render("course/view", { b: data, n: name, i: image });
    } catch (error) {
      console.log(error);
    }
  };

  static Course_edit = async (req, res) => {
    try {
      const { name, email, id, image } = req.user;
      //console.log(req.params.id)
      const data = await CourseModel.findById(req.params.id);
      //console.log(data);
      res.render("course/edit", { d: data, n: name, i: image });
    } catch (error) {
      console.log(error);
    }
  };

  static Course_update = async (req, res) => {
    try {
      const { name, email, id, image } = req.user;
      const result = await CourseModel.findByIdAndUpdate(req.params.id, {
        name: req.body.name,
        email: req.body.email,
        mobile_number: req.body.mobile_number,
        address: req.body.address,
        gender: req.body.gender,
        course: req.body.course,
        qualification: req.body.qualification,
      });
      req.flash("success", "Update Successfully !");
      res.redirect("/course_display");
    } catch (error) {
      console.log(error);
    }
  };

  static course_delete = async (req, res) => {
    try {
      const result = await CourseModel.findByIdAndDelete(req.params.id);
      req.flash("success", "Delete Successfully !");
      res.redirect("/course_display");
    } catch (error) {
      console.log(error);
    }
  };

  static sendEmail = async (comment, course, email, status) => {
    // console.log("first");
    let testAccount = await nodemailer.createTestAccount();

    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false, // true for 465, false for other ports
      auth: {
        user: "ns800622@gmail.com",
        pass: "zbhhfswrowvuyafz",
      },
    });

    // send mail with defined transport object
    let info = await transporter.sendMail({
      from: '"neelesh@gmail.com" <ns800622@gmail.com>', // sender address
      to: email, // list of receivers
      subject: "Hello ✔", // Subject line
      text: "Hello world?", // plain text body
      html: `<b>Your course <b>${course}</b> has resistered successfully</b>`, // html body
    });
  };
}
module.exports = CourseController;
