import Image from "next/legacy/image";

const Avatar = () => {
  return (
    <Image
      alt="Avatar"
      src="/images/avatar.jpg"
      width={0}
      height={0}
      layout="responsive"
      loading="eager"
    />
  );
};

export default Avatar;
