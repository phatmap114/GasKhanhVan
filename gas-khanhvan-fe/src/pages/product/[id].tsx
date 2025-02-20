import {useRouter} from 'next/router'
import {useEffect, useState} from 'react'
import {
  Card,
  Typography,
  Button,
  Row,
  Col,
  Image,
  Spin,
  Tabs,
  Badge,
  Space,
  Tag,
  Divider,
} from 'antd'
import {ShoppingCartOutlined} from '@ant-design/icons'
import cylinders, {Cylinder} from '../../../data/cylinders'
import MainLayout from '@/layouts/MainLayout'
import ProductCard from '@/components/common/ProductCard'

const {Title, Text, Paragraph} = Typography
const {TabPane} = Tabs

const ProductDetail: React.FC = () => {
  const router = useRouter()
  const {id} = router.query

  const [cylinder, setCylinder] = useState<Cylinder | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (id) {
      const product = cylinders.find((c) => c.id === id)
      setCylinder(product || null)
      setLoading(false)
    }
  }, [id])

  if (loading) return <Spin size='large' style={{display: 'block', margin: '50px auto'}} />
  if (!cylinder) return <Text type='danger'>Product not found.</Text>

  // Fetch related products (e.g., same category or type)
  //   const relatedProducts = cylinders.filter((c) => c.type === cylinder.type && c.id !== cylinder.id)
  const relatedProducts = cylinders.filter((c) => parseInt(c.id) < 5)

  return (
    <MainLayout>
      <Row gutter={[32, 32]} style={{padding: '20px'}}>
        {/* Smaller Image Section */}
        <Col xs={24} sm={12} md={8}>
          <Badge.Ribbon
            text={cylinder.stock > 0 ? 'In Stock' : 'Out of Stock'}
            color={cylinder.stock > 0 ? 'green' : 'red'}
          >
            <Image width='100%' src={cylinder.image} alt={cylinder.name} />
          </Badge.Ribbon>
        </Col>

        {/* Product Info Section */}
        <Col xs={24} sm={12} md={16}>
          <Card
            bordered={false}
            style={{boxShadow: '0px 4px 10px rgba(0,0,0,0.1)', borderRadius: '10px'}}
          >
            <Title level={2}>{cylinder.name}</Title>
            <Text type='secondary' style={{fontSize: '16px'}}>
              Type: {cylinder.type}
            </Text>

            {/* Price */}
            <Row align='middle' gutter={16}>
              <Col>
                <Title level={3} style={{color: '#E53935', fontWeight: 'bold'}}>
                  $
                  {cylinder.price.toLocaleString('vi', {style: 'currency', currency: 'VND'}) ||
                    'LIÊN HỆ'}
                </Title>
              </Col>
              <Col>
                {cylinder.stock > 0 && (
                  <Tag color='green' style={{fontSize: '16px'}}>
                    Available
                  </Tag>
                )}
                {cylinder.stock === 0 && (
                  <Tag color='red' style={{fontSize: '16px'}}>
                    Out of Stock
                  </Tag>
                )}
              </Col>
            </Row>

            {/* Description */}
            <Paragraph>{cylinder.description}</Paragraph>

            <Space style={{marginTop: '20px'}}>
              <Button
                type='primary'
                icon={<ShoppingCartOutlined />}
                size='large'
                disabled={cylinder.stock === 0}
              >
                Buy Now
              </Button>
              <Button type='default' size='large'>
                Add to Cart
              </Button>
            </Space>
          </Card>

          {/* Tabs for More Details */}
          <Tabs defaultActiveKey='1' style={{marginTop: '20px'}}>
            <TabPane tab='Product Description' key='1'>
              <Paragraph>{cylinder.description}</Paragraph>
            </TabPane>
            <TabPane tab='Specifications' key='2'>
              <ul>
                <li>
                  <strong>Type:</strong> {cylinder.type}
                </li>
                <li>
                  <strong>Price:</strong> $
                  {cylinder.price.toLocaleString('vi', {style: 'currency', currency: 'VND'}) ||
                    'LIÊN HỆ'}
                </li>
                <li>
                  <strong>Stock:</strong>{' '}
                  {cylinder.stock > 0 ? `${cylinder.stock} Available` : 'Out of Stock'}
                </li>
                <li>
                  <strong>Created At:</strong> {new Date(cylinder.createdAt).toLocaleDateString()}
                </li>
              </ul>
            </TabPane>
            <TabPane tab='Reviews' key='3'>
              <Text>No reviews yet. Be the first to leave a review!</Text>
            </TabPane>
          </Tabs>

          {/* Divider for More Options */}
          <Divider />
          <Space>
            <Button type='link' href='#help-center'>
              Need Help?
            </Button>
          </Space>
        </Col>

        {/* Related Products Section */}
        <Col xs={24} style={{marginTop: '40px'}}>
          <Title level={3}>Related Products</Title>
          <Row gutter={[16, 16]}>
            {relatedProducts.length > 0 ? (
              relatedProducts.map((relatedProduct) => (
                <Col key={relatedProduct.id} xs={24} sm={12} md={8} lg={6}>
                  <ProductCard cylinder={relatedProduct} />
                </Col>
              ))
            ) : (
              <Text>No related products found.</Text>
            )}
          </Row>
        </Col>
      </Row>
    </MainLayout>
  )
}

export default ProductDetail
