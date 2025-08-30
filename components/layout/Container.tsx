const Container = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="max-w-[1520px] w-full mx-auto xl:px-20 px-6 py-4">
      {children}
    </div>
  );
};

export default Container;
