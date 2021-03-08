const User = require('../models/users');
const passport = require('passport');
const Collection = require('../models/collections');
const Collectionitem = require('../models/collectionitems');

exports.getHome = async (req, res, next) => {
  const collections = await Collection.find({ userId: req.user });

  res.render('layouts/main', {
    collections,
  });
};

exports.getLogin = (req, res, next) => {
  res.render('layouts/login');
};

exports.getSignup = (req, res, next) => {
  res.render('layouts/signup');
};

exports.postSignup = async (req, res, next) => {
  console.log(req.body);

  const { name, email, password, passwordConfirm } = req.body;

  let errors = [];

  if (!name || !email || !password || !passwordConfirm) {
    errors.push({ message: 'Please enter all the fields' });
  }
  if (password.length < 6) {
    errors.push({ message: 'Password must be at least 6 characters' });
  } else if (password != passwordConfirm) {
    errors.push({ message: 'Passwords do not match' });
  }

  if (errors.length > 0) {
    return res.render('layouts/signup', {
      errors,
      name,
      email,
      password,
      passwordConfirm,
    });
  }
  try {
    const user = await User.findOne({ email: email });
    if (user) {
      errors.push({ message: 'Email already exists' });
      return res.render('layouts/signup', {
        errors,
        name,
        email,
        password,
        passwordConfirm,
      });
    }

    await User.create({
      name,
      email,
      password,
      passwordConfirm,
    });
    res.redirect('/login');
  } catch (err) {
    console.log(err);
  }
};

exports.postLogin = (req, res, next) => {
  passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/login',
    failureFlash: true,
  })(req, res, next);
};

exports.getLogout = (req, res) => {
  req.logout();
  req.flash('success_msg', 'You are logged out');
  res.redirect('login');
};

exports.postCollection = async (req, res, next) => {
  const name = req.body.title;
  try {
    if (!req.body.name) {
      return res.redirect('/');
    }
    await Collection.create({
      name: name,
      userId: req.user,
    });

    res.redirect('/');
  } catch (error) {
    console.log(error);
  }
};

exports.getSingleCollection = async (req, res, next) => {
  const id = req.params.id;
  const collectionItems = await Collectionitem.find({ parentCollectionId: id });
  const parentCollection = await Collection.findById(id);
  const collectionName = parentCollection.name;
  res.render('layouts/singleitem', {
    collectionId: id,
    collectionItems,
    collectionName,
  });
};

exports.postSingleCollection = async (req, res, next) => {
  const title = req.body.title;
  const info = req.body.info;

  const parentCollectionId = req.params.id;
  if (!title) {
    return res.redirect('/collections/' + parentCollectionId);
  }

  if (!info) {
    return res.redirect('/collections/' + parentCollectionId);
  }

  try {
    const items = await Collectionitem.create({
      title,
      info,
      parentCollectionId,
    });
    await items.save();
    res.redirect('/collections/' + parentCollectionId);
  } catch (error) {
    console.log(error);
  }
};

exports.postDeleteNote = async (req, res, next) => {
  console.log(req.params);
  const parentId = req.params.id1;
  const noteId = req.params.id2;
  await Collectionitem.findOneAndDelete({ _id: noteId });
  res.redirect('/collections/' + parentId);
};

exports.postDeleteCollection = async (req, res, next) => {
  try {
    const id = req.params.id;
    await Collection.findByIdAndRemove(id);
    await Collectionitem.deleteMany({ parentCollectionId: id });
    res.redirect('/');
  } catch (error) {
    console.log(error);
  }
};
