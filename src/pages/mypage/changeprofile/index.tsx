import React, { useState } from 'react';
import Link from 'next/link';
// import { useQuery } from 'react-query'; // Uncomment when useQuery is available

export default function Profile() {
  const [selectedFile, setSelectedFile] = useState(null);

  // Mock state values
  const [name, setName] = useState('닉네임_123');
  const [email, setEmail] = useState('user1@example.com');
  const [job, setJob] = useState('디자인');
  const [contact, setContact] = useState('+82 10-1234-5678');

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append('file', selectedFile);

    // Dummy function for file upload, implement as needed
  };

  // Uncomment and implement useQuery to fetch real data
  // const { data, isLoading, error } = useQuery('profileData', fetchProfileData);

  return (
    <div className="w-full  flex items-center justify-center">
      <div className="w-full max-w-md bg-white p-6 rounded-lg ">
        {/* Profile Picture Section */}
        <div className="flex flex-col items-center mb-[12px] mt-[80px]">
          <div className="w-[100px] relative">
            <img
              className="w-24 h-24 rounded-full"
              src="/mypage/profilechange/ProfileImage.svg"
              alt="Profile Picture"
            />
            <label
              htmlFor="fileInput"
              className="w-7 h-7 absolute bottom-0 right-0 bg-neutral-400 rounded-full border border-white cursor-pointer flex items-center justify-center">
              <img
                className="w-4 h-4"
                src="/mypage/profilechange/Camera.svg"
                alt="Edit Icon"
              />
              <input
                id="fileInput"
                type="file"
                className="hidden"
                onChange={handleFileChange}
              />
            </label>
          </div>
        </div>

        {/* Form Fields */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Name Field */}
          <div>
            <label className="block text-neutral-600 text-base font-semibold mb-2">
              이름
            </label>
            <div className="w-full h-12 px-4 py-2 bg-stone-50 rounded-lg border border-neutral-300 flex items-center">
              <span className="text-neutral-400 text-sm">{name}</span>
            </div>
          </div>
          {/* Email Field */}
          <div>
            <label className="block text-neutral-600 text-base font-semibold mb-2">
              이메일
            </label>
            <div className="w-full h-12 px-4 py-2 bg-stone-50 rounded-lg border border-neutral-300 flex items-center">
              <span className="text-neutral-400 text-sm">{email}</span>
            </div>
          </div>
          {/* Password Field */}
          <div>
            <label className="block text-neutral-600 text-base font-semibold mb-2 flex items-center">
              비밀번호
              <span className="w-1.5 h-1.5 bg-yellow-400 rounded-full ml-1"></span>
            </label>
            <Link href="/mypage/changepassword">
              <div className="w-full h-12 p-2 rounded-lg border border-indigo-700 flex items-center justify-center cursor-pointer">
                <span className="text-indigo-700 text-sm">비밀번호 변경하기</span>
              </div>
            </Link>
          </div>
          {/* Job Field */}
          <div>
            <label className="block text-neutral-600 text-base font-semibold mb-2">
              직무
            </label>
            <div className="w-full h-12 px-4 py-2 bg-stone-50 rounded-lg border border-neutral-300 flex items-center">
              <span className="text-neutral-400 text-sm">{job}</span>
            </div>
          </div>
          {/* Contact Field */}
          <div>
            <label className="block text-neutral-600 text-base font-semibold mb-2">
              연락처
            </label>
            <div className="w-full h-12 px-4 py-2 bg-stone-50 rounded-lg border border-neutral-300 flex items-center">
              <span className="text-neutral-400 text-sm">{contact}</span>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
