import { useRouter } from "next/router";
import { useEffect, useState } from "react";
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
  Breadcrumb,
} from "antd";
import { ShoppingCartOutlined } from "@ant-design/icons";
import cylinders, { Cylinder } from "../../../data/cylinders";
import MainLayout from "@/layouts/MainLayout";
import ProductCard from "@/components/common/ProductCard";

const { Title, Text, Paragraph } = Typography;
const { TabPane } = Tabs;

const ProductDetail: React.FC = () => {
  const router = useRouter();
  const { id } = router.query;

  const [cylinder, setCylinder] = useState<Cylinder | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      const product = cylinders.find((c) => c.id === id);
      setCylinder(product || null);
      setLoading(false);
    }
  }, [id]);

  if (loading)
    return (
      <Spin size="large" style={{ display: "block", margin: "50px auto" }} />
    );
  if (!cylinder) return <Text type="danger">Không tìm thấy sản phẩm.</Text>;

  // Fetch related products (e.g., same category or type)
  //   const relatedProducts = cylinders.filter((c) => c.type === cylinder.type && c.id !== cylinder.id)
  const relatedProducts = cylinders.filter((c) => parseInt(c.id) < 5);

  return (
    <MainLayout>
      <Breadcrumb style={{ padding: "10px 50px" }}>
        <Breadcrumb.Item>Home</Breadcrumb.Item>
        <Breadcrumb.Item>List</Breadcrumb.Item>
        <Breadcrumb.Item>App</Breadcrumb.Item>
      </Breadcrumb>
      <Row gutter={[32, 32]} style={{ padding: "20px" }}>
        {/* Smaller Image Section */}
        <Col xs={24} sm={12} md={8}>
          <Badge.Ribbon
            text={cylinder.stock > 0 ? "Còn hàng" : "Hết hàng"}
            color={cylinder.stock > 0 ? "green" : "red"}
          >
            <Image width="100%" src={cylinder.image} alt={cylinder.name} />
          </Badge.Ribbon>
        </Col>

        {/* Product Info Section */}
        <Col xs={24} sm={12} md={16}>
          <Card
            bordered={false}
            style={{
              boxShadow: "0px 4px 10px rgba(0,0,0,0.1)",
              borderRadius: "10px",
            }}
          >
            <Title level={2}>{cylinder.name}</Title>
            <Text type="secondary" style={{ fontSize: "16px" }}>
              Danh mục: {cylinder.type}
            </Text>

            {/* Price */}
            <Row align="middle" gutter={16}>
              <Col>
                <Title
                  level={3}
                  style={{ color: "#E53935", fontWeight: "bold" }}
                >
                  $
                  {cylinder.price.toLocaleString("vi", {
                    style: "currency",
                    currency: "VND",
                  }) || "LIÊN HỆ"}
                </Title>
              </Col>
              <Col>
                {cylinder.stock > 0 && (
                  <Tag color="green" style={{ fontSize: "16px" }}>
                    Còn hàng
                  </Tag>
                )}
                {cylinder.stock === 0 && (
                  <Tag color="red" style={{ fontSize: "16px" }}>
                    Hết hàng
                  </Tag>
                )}
              </Col>
            </Row>

            {/* Description */}
            <Paragraph>{cylinder.description}</Paragraph>

            <Space style={{ marginTop: "20px" }}>
              <Button
                type="primary"
                icon={<ShoppingCartOutlined />}
                size="large"
                disabled={cylinder.stock === 0}
              >
                Mua ngay
              </Button>
              <Button type="default" size="large">
                Thêm vào giỏ hàng
              </Button>
            </Space>
          </Card>
        </Col>

        {/* Related Products Section */}
        <Col xs={24} style={{ marginTop: "40px" }}>
          <Card
            bordered={false}
            style={{
              boxShadow: "0px 4px 10px rgba(0,0,0,0.1)",
              borderRadius: "10px",
            }}
          >
            {/* Tabs for More Details */}
            <Tabs defaultActiveKey="1" style={{ marginTop: "20px" }}>
              <TabPane tab="Thông tin sản phẩm" key="1">
                <ul>
                  <li>
                    <strong>Danh mục:</strong> {cylinder.type}
                  </li>
                  <li>
                    <strong>Giá:</strong> $
                    {cylinder.price.toLocaleString("vi", {
                      style: "currency",
                      currency: "VND",
                    }) || "LIÊN HỆ"}
                  </li>
                  <li>
                    <strong>Số lượng:</strong>{" "}
                    {cylinder.stock > 0
                      ? `${cylinder.stock} Available`
                      : "Out of Stock"}
                  </li>
                </ul>
              </TabPane>
              <TabPane tab="Đánh giá" key="2">
                <Text>Chưa có đánh giá nào! Đánh giá ngay</Text>
              </TabPane>
            </Tabs>

            {/* Divider for More Options */}
            <Divider />
            <Space>
              <Button type="link" href="#help-center">
                Bạn cần hỗ trợ? Gọi 001230012 để được trợ giúp
              </Button>
            </Space>
          </Card>
        </Col>

        {/* Related Products Section */}
        <Col xs={24} style={{ marginTop: "40px" }}>
          <Title level={3}>Sản phẩm liên quan</Title>
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
  );
};

export default ProductDetail;
