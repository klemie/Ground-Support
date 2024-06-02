# Use the official Ubuntu base image
FROM ubuntu:22.04

# Set the working directory inside the container
WORKDIR /app

# Copy the application files to the container
COPY . /app

# Update default packages
RUN apt-get update
    
# Get Ubuntu packages
RUN apt-get install -y \
    build-essential \
    curl \
    git \
    libusb-1.0-0-dev \
    cmake \
    libasound2-dev \
    libudev-dev \
    pkg-config

# Update new packages
RUN apt-get update

# Build rtl-sdr
RUN mkdir ./rtl-sdr \
    && git clone https://gitea.osmocom.org/sdr/rtl-sdr.git ./rtl-sdr \
    && cd ./rtl-sdr \
    && mkdir build \
    && cd build \
    && cmake ../ -DINSTALL_UDEV_RULES=ON -DDETACH_KERNEL_DRIVER=ON \
    && make \
    && make install \
    && ldconfig


# Build Direwolf
RUN cd ~ \
    && git clone https://www.github.com/wb2osz/direwolf ./direwolf\
    && cd direwolf \
    && mkdir build \
    && cd build \
    && cmake .. \
    && make -j4 \
    && make install

# Update new packages
RUN apt-get update

# Get Rust
RUN curl https://sh.rustup.rs -sSf | bash -s -- -y
ENV PATH="/root/.cargo/bin:${PATH}"

RUN cargo build

# Make the shell script executable
RUN chmod +x ./tools/decode.sh

# Create a non-root user
RUN useradd -m myuser && \
    echo "myuser ALL=(ALL) NOPASSWD:ALL" >> /etc/sudoers

# Switch to the non-root user
USER myuser

# Set the working directory
WORKDIR /app


# Define the entry point
ENTRYPOINT ["./tools/decode.sh"]
# # Start the application
# CMD ["./tools/decode.sh"]
