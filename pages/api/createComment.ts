// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import { sanityClient } from '../../sanity';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { _id, name, email, comment } = JSON.parse(req.body);

  try {
    await sanityClient.create({
      _type: 'comment',
      post: { _type: 'reference', _ref: _id },
      name,
      email,
      comment,
    });
  } catch (err) {
    return res.status(500).json({ message: "Couldn' submit comment", err });
  }

  console.log('comment submitted');
  return res.status(200).json({ message: 'Comment submitted' });
}
