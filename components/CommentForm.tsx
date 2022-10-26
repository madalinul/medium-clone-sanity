import React, { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { Post } from '../typings';

interface FormInput {
  _id: string;
  name: string;
  email: string;
  comment: string;
}

interface CommentFormProps {
  post: Post;
}

const CommentForm = ({ post }: CommentFormProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormInput>();
  const [submited, setSubmited] = useState(false);

  const onSubmit: SubmitHandler<FormInput> = async (data) => {
    try {
      await fetch('/api/createComment', {
        method: 'POST',
        body: JSON.stringify(data),
      });
      setSubmited(true);
    } catch (err) {
      console.warn(err);
    }
  };

  if (submited) {
    return (
      <div className="flex flex-col p-10 my-10 bg-yellow-500 text-white max-w-2xl mx-auto">
        <h3 className="text-3xl font-bold">
          Thank you for submitting your comment!
        </h3>
        <p>Once it has been approved it will appear bellow!</p>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col p-5 mx-auto max-w-2xl mb-10"
      autoComplete="off"
    >
      <h3 className="text-sm text-yellow-500">Enjoyed this article?</h3>
      <h4 className="text-3xl font-bold">Leave a comment bellow!</h4>
      <hr className="py-3 mt-2" />

      <input {...register('_id')} type="hidden" name="_id" value={post._id} />

      <label className="block mb-5">
        <span className="text-gray-700">Name</span>
        <input
          {...register('name', { required: 'Name is required' })}
          className="shadow border rounded py-2 px-3 form-input mt-1 block w-full ring-yellow-500 outline-none focus:ring"
          placeholder="Type in your name"
          type="text"
        />
      </label>
      <label className="block mb-5">
        <span className="text-gray-700">Email</span>
        <input
          {...register('email', {
            required: 'Email is required',
            pattern: {
              value: /\S+@\S+\.\S+/,
              message: 'Entered value does not match email format',
            },
          })}
          className="shadow border rounded py-2 px-3 form-input mt-1 block w-full ring-yellow-500 outline-none focus:ring"
          placeholder="mail@example.com"
          type="text"
        />
      </label>
      <label className="block mb-5">
        <span className="text-gray-700">Comment</span>
        <textarea
          {...register('comment', { required: 'Comment is required' })}
          className="shadow border rounded py-2 px-3 form-textarea mt-1 block w-full ring-yellow-500 outline-none focus:ring"
          placeholder="Enter long comment"
          rows={8}
        />
      </label>

      <div>
        {Object.entries(errors).map(([key, error]) => {
          if (!error) {
            return null;
          }
          return (
            <div className="text-red-500" key={key}>
              {error.message}
            </div>
          );
        })}
      </div>

      <input
        className="shadow bg-yellow-500 hover:bg-yellow-400 focus:shadow-outline focus:outline-none font-bold py-2 text-white px-4 cursor-pointer"
        type="submit"
      />
    </form>
  );
};

export default CommentForm;
