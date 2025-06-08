# Sử dụng Node.js 20 để đảm bảo tương thích
FROM node:18-alpine

# Tạo thư mục làm việc
WORKDIR /app

# Sao chép file package.json và package-lock.json
COPY package*.json ./

# Cài đặt các dependencies
RUN npm install

# Sao chép toàn bộ mã nguồn vào container
COPY . .

# Mở port 3000
EXPOSE 3000

# Build ứng dụng Next.js
RUN npm run build

# Lệnh chạy ứng dụng
CMD ["npm", "run", "start"]
