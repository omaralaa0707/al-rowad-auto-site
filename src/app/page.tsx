import { Nav, Hero, Origins, Board, Branches, Room, Footer } from "@/components/site/sections";

export default function Page() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <Origins />
        <Board />
        <Branches />
        <Room />
      </main>
      <Footer />
    </>
  );
}
