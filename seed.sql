-- seed.sql

INSERT INTO public.products (name, model, storage, colors, condition, price, old_price, stock, images, specs, badge, featured)
VALUES 
('iPhone 15 Pro Max', 'iPhone 15 Series', ARRAY['256GB', '512GB', '1TB'], ARRAY['Natural Titanium', 'Blue Titanium', 'White Titanium', 'Black Titanium'], 'New', 289900, NULL, 15, ARRAY['https://res.cloudinary.com/demo/image/upload/v1/iphone-15-pro-max.png'], '{"Display": "6.7-inch Super Retina XDR", "Chip": "A17 Pro", "Camera": "48MP Main, 5x Telephoto", "Battery": "Up to 29 hours video", "OS": "iOS 17"}'::jsonb, 'New', true),

('iPhone 15 Pro', 'iPhone 15 Series', ARRAY['128GB', '256GB', '512GB', '1TB'], ARRAY['Natural Titanium', 'Blue Titanium', 'White Titanium', 'Black Titanium'], 'New', 249900, NULL, 20, ARRAY['https://res.cloudinary.com/demo/image/upload/v1/iphone-15-pro.png'], '{"Display": "6.1-inch Super Retina XDR", "Chip": "A17 Pro", "Camera": "48MP Main, 3x Telephoto", "Battery": "Up to 23 hours video", "OS": "iOS 17"}'::jsonb, 'New', true),

('iPhone 15', 'iPhone 15 Series', ARRAY['128GB', '256GB', '512GB'], ARRAY['Pink', 'Yellow', 'Green', 'Blue', 'Black'], 'New', 179900, 189900, 25, ARRAY['https://res.cloudinary.com/demo/image/upload/v1/iphone-15-pink.png'], '{"Display": "6.1-inch Super Retina XDR", "Chip": "A16 Bionic", "Camera": "48MP Main, 2x Telephoto", "Battery": "Up to 20 hours video", "OS": "iOS 17"}'::jsonb, 'Hot', true),

('iPhone 14 Pro', 'iPhone 14 Series', ARRAY['128GB', '256GB', '512GB', '1TB'], ARRAY['Deep Purple', 'Gold', 'Silver', 'Space Black'], 'Refurbished', 159900, 185000, 10, ARRAY['https://res.cloudinary.com/demo/image/upload/v1/iphone-14-pro-purple.png'], '{"Display": "6.1-inch Super Retina XDR", "Chip": "A16 Bionic", "Camera": "48MP Main, 3x Telephoto", "Battery": "Up to 23 hours video", "OS": "iOS 16"}'::jsonb, 'Refurbished', false),

('iPhone 14', 'iPhone 14 Series', ARRAY['128GB', '256GB', '512GB'], ARRAY['Midnight', 'Starlight', 'Product RED', 'Blue', 'Purple', 'Yellow'], 'Refurbished', 119900, 140000, 18, ARRAY['https://res.cloudinary.com/demo/image/upload/v1/iphone-14-midnight.png'], '{"Display": "6.1-inch Super Retina XDR", "Chip": "A15 Bionic", "Camera": "12MP Main, Ultrawide", "Battery": "Up to 20 hours video", "OS": "iOS 16"}'::jsonb, 'Refurbished', true),

('iPhone 13 Pro', 'iPhone 13 Series', ARRAY['128GB', '256GB', '512GB', '1TB'], ARRAY['Sierra Blue', 'Silver', 'Gold', 'Graphite', 'Alpine Green'], 'Used', 109900, 135000, 5, ARRAY['https://res.cloudinary.com/demo/image/upload/v1/iphone-13-pro-blue.png'], '{"Display": "6.1-inch Super Retina XDR", "Chip": "A15 Bionic", "Camera": "12MP Main, 3x Telephoto", "Battery": "Up to 22 hours video", "OS": "iOS 15"}'::jsonb, 'Used', false),

('iPhone 13', 'iPhone 13 Series', ARRAY['128GB', '256GB', '512GB'], ARRAY['Midnight', 'Starlight', 'Product RED', 'Blue', 'Pink', 'Green'], 'Used', 79900, 100000, 12, ARRAY['https://res.cloudinary.com/demo/image/upload/v1/iphone-13-midnight.png'], '{"Display": "6.1-inch Super Retina XDR", "Chip": "A15 Bionic", "Camera": "12MP Main, Ultrawide", "Battery": "Up to 19 hours video", "OS": "iOS 15"}'::jsonb, 'Used', false),

('iPhone 15 Plus', 'iPhone 15 Series', ARRAY['128GB', '256GB', '512GB'], ARRAY['Pink', 'Yellow', 'Green', 'Blue', 'Black'], 'New', 199900, NULL, 8, ARRAY['https://res.cloudinary.com/demo/image/upload/v1/iphone-15-plus.png'], '{"Display": "6.7-inch Super Retina XDR", "Chip": "A16 Bionic", "Camera": "48MP Main, 2x Telephoto", "Battery": "Up to 26 hours video", "OS": "iOS 17"}'::jsonb, 'New', false);
