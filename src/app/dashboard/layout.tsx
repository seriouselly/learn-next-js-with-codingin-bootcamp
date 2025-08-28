const Dashboard = ({
  children,
  main,
}: Readonly<{
  children: React.ReactNode;
  main: React.ReactNode;
}>) => {
  return (
    <div>
      <h1>Dashboard</h1>
      {main}
      {children}
    </div>
  );
};
export default Dashboard;
