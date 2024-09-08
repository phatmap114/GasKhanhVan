import { Breadcrumb, Layout, Menu, theme } from "antd";
import Navbar from "@/components/common/Navbar";
import { Footer } from "antd/es/layout/layout";
import React, { ReactNode } from "react";
import HeadTag from "@/components/home/HeadTag";

import styles from "../styles/layouts/CategoryLayout.module.scss";

const { Content } = Layout;

type CategoryLayoutProps = {
  children: ReactNode;
};

export default function CategoryLayout({ children }: CategoryLayoutProps) {
  return (
    <Layout>
      <HeadTag />
      <Navbar />
      <Content className={styles.container}>
        <Breadcrumb style={{ margin: "16px 0" }}>
          <Breadcrumb.Item>Home</Breadcrumb.Item>
          <Breadcrumb.Item>List</Breadcrumb.Item>
          <Breadcrumb.Item>App</Breadcrumb.Item>
        </Breadcrumb>
        <main>{children}</main>
      </Content>
      <Footer />
    </Layout>
  );
}
