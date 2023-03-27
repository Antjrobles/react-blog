import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import { PostCard, Categories, PostWidget, Header } from "../components";
import { getPosts } from "../services";
import {
  ClerkProvider,
  SignedIn,
  SignInButton,
  SignOutButton,
  SignedOut,
  UserButton,
  useUser,
  RedirectToSignIn,
} from "@clerk/clerk-react";



const clerkPubKey = process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY;

const Home: NextPage = ({ posts }) => {
  return (

    <ClerkProvider publishableKey={clerkPubKey}>
 
     {/* <div>
      {!user.isSignedIn && <SignInButton />}
      {!!user.isSignedIn && <SignOutButton />}
      </div> */}
      <SignedOut>
        <RedirectToSignIn />
      </SignedOut>
    <div className="container mx-auto px-10 mb-8">
      <Head>
        <title>Antonio Robles | BLOG</title>
        <link rel="icon" href="/AR2.svg" />
      </Head>
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        <div className="lg:col-span-8 col-span-1">
          {posts.map((post) => (
            <PostCard post={post.node} key={post.title} />
          ))}
        </div>
        <div className="lg:col-span-4 col-span-1">
          <div className="lg:sticky relative top-8">
            <PostWidget />
            <Categories />
          </div>
        </div>
      </div>
    </div>
    </ClerkProvider>
  );
};

//NEXTjs function to fetch data from API
export async function getStaticProps() {
  const posts = (await getPosts()) || [];

  return {
    props: { posts },
  };
}

export default Home;
