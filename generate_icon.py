import struct
import zlib
import sys

def create_png(width, height):
    # PNG Header
    png_signature = b'\x89PNG\r\n\x1a\n'
    
    # IHDR Chunk
    ihdr_data = struct.pack('!IIBBBBB', width, height, 8, 2, 0, 0, 0)
    ihdr_crc = zlib.crc32(ihdr_data, zlib.crc32(b'IHDR'))
    ihdr = struct.pack('!I', len(ihdr_data)) + b'IHDR' + ihdr_data + struct.pack('!I', ihdr_crc)
    
    # IDAT Chunk (RGB data: 0, 0, 255 - Blue)
    raw_data = b''
    for y in range(height):
        raw_data += b'\x00' + b'\x00\x00\xff' * width
    
    compressed_data = zlib.compress(raw_data)
    idat_crc = zlib.crc32(compressed_data, zlib.crc32(b'IDAT'))
    idat = struct.pack('!I', len(compressed_data)) + b'IDAT' + compressed_data + struct.pack('!I', idat_crc)
    
    # IEND Chunk
    iend_crc = zlib.crc32(b'', zlib.crc32(b'IEND'))
    iend = struct.pack('!I', 0) + b'IEND' + struct.pack('!I', iend_crc)
    
    return png_signature + ihdr + idat + iend

if __name__ == "__main__":
    if len(sys.argv) < 2:
        print("Usage: python generate_png.py <output_file>")
        sys.exit(1)
        
    filename = sys.argv[1]
    with open(filename, 'wb') as f:
        f.write(create_png(48, 48))
    print(f"Generated {filename}")
