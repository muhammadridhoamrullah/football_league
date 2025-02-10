import Navbar from "./Navbar";

export default function MainLayout() {
  return (
    <>
      <Navbar />
      <MainLayout />
    </>
  );
}
