import { env } from '../../config';

// TODO: stub sessions in test environment
export default function (req, res, next) {
  if (req.session.profile || env.test) {
    next();
  }

  res.status(401).json({
    error: 'Not signed in.'
  });
}
