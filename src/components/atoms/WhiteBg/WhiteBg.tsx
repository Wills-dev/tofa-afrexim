const WhiteBg = ({ loading = false }: { loading: boolean }) => {
  if (!loading) {
    return null;
  }
  return (
    <div className="w-full h-screen min-h-full min-w-full bg-white opacity-60 fixed top-0 left-0 z-50" />
  );
};

export default WhiteBg;
