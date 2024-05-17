import React, { Fragment } from 'react';
import { Comment } from '../mock/comments';
import CommentsItem from './CommentsItem';

const CommentsLayout = ({ commentsData }: { commentsData: Comment[] }) => {
  //todo 댓글 없을 때 디자인 필요
  return (
    <div>
      <div className="mt-5">댓글 수 </div>
      {commentsData.map((comment, i) => (
        <Fragment key={i}>
          <CommentsItem comment={comment} />
          {i < commentsData.length - 1 && (
            <div className="w-full h-[2px] bg-gray-100 mr-12" />
          )}
        </Fragment>
      ))}
    </div>
  );
};

export default CommentsLayout;
