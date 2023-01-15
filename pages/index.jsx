import clsx from "clsx";
import Head from "next/head";
import Link from "next/link";
import { useEffect, useState } from "react";
import Layout, { siteTitle } from "../components/layout";
import { getSortedPostsData } from "../lib/posts";
import utilStyles from "../styles/utils.module.scss";

export async function getStaticProps() {
  const allPostsData = getSortedPostsData();
  return {
    props: {
      allPostsData,
    },
  };
}

export default function Home({ allPostsData }) {
  const [alert, setAlert] = useState(false);
  const [counter, setCounter] = useState(0);

  useEffect(() => {
    setAlert(false);
  }, []);
  return (
    <Layout home>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <section className={utilStyles.headingMd}>
        <p>Hello, Im AntoBo. Here is my blog:</p>
        <p
          className={clsx({
            [utilStyles.success]: alert === true,
            [utilStyles.error]: alert === false,
          })}
        >
          Alert!
        </p>
        <h3>Counter</h3>
        <div>
          <button
            onClick={() => {
              setCounter(counter - 1);
            }}
            type="button"
          >
            {" "}
            -{" "}
          </button>{" "}
          <span>{counter}</span>{" "}
          <button
            onClick={() => {
              setCounter(counter + 1);
            }}
            type="button"
          >
            {" "}
            +{" "}
          </button>
        </div>
      </section>

      <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
        <h2 className={utilStyles.headingLg}>Blog</h2>
        <ul className={utilStyles.list}>
          {allPostsData.map(({ id, date, title }) => (
            <li className={utilStyles.listItem} key={id}>
              <Link href={"posts/" + id}>{title}</Link>
              <br />
              {id}
              <br />
              {date}
            </li>
          ))}
        </ul>
      </section>
    </Layout>
  );
}
