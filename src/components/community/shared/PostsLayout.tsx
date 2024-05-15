import React, { useState } from 'react';
import FilterPicker from './FilterPicker';

const PostsLayout = () => {
  const [filterPicker, setFilterPicker] = useState<string>('최신순');
  return (
    <div className="mx-4">
      <FilterPicker filterPicker={filterPicker} setFilterPicker={setFilterPicker} />
      <div className="mt-[200px]">asdasd</div>
    </div>
  );
};

export default PostsLayout;
