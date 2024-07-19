import * as React from 'react'
import {Col, Flex, Row} from 'antd'
import {Typography} from 'antd'
import Container from '../common/Container'

import styles from '../../styles/home/ProductSection.module.scss'
import ProductCard from '../common/ProductCard'

const {Title} = Typography

export default function ProductSection() {
  return (
    <Container>
      <Flex justify='center' align='center'>
        <Title level={2} className={styles.title}>
          SẢN PHẨM
        </Title>
        <div className={styles.border}></div>
      </Flex>
      <Flex vertical>
        <Title level={3} className={styles.product_title}>
          Khuyến mãi hôm nay
        </Title>
        <div className={styles.line_break}></div>
      </Flex>
      <Row className={styles.card_wrap} gutter={24}>
        <Col span={4}>
          <ProductCard />
        </Col>
        <Col span={4}>
          <ProductCard />
        </Col>
        <Col span={4}>
          <ProductCard />
        </Col>
        <Col span={4}>
          <ProductCard />
        </Col>
        <Col span={4}>
          <ProductCard />
        </Col>
        <Col span={4}>
          <ProductCard />
        </Col>
      </Row>
    </Container>
  )
}
