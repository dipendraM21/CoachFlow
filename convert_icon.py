import os
from PIL import Image

# Source logo path
SOURCE_LOGO = 'src/assets/images/png/app-logo.jpeg'

# Mipmap directories and their target sizes (px)
# mdpi: 48, hdpi: 72, xhdpi: 96, xxhdpi: 144, xxxhdpi: 192
MIPMAP_SIZES = {
    'mipmap-mdpi': 48,
    'mipmap-hdpi': 72,
    'mipmap-xhdpi': 96,
    'mipmap-xxhdpi': 144,
    'mipmap-xxxhdpi': 192
}

ANDROID_RES_DIR = 'android/app/src/main/res'

def generate_icons():
    if not os.path.exists(SOURCE_LOGO):
        print(f"Error: Source logo not found at {SOURCE_LOGO}")
        return

    try:
        img = Image.open(SOURCE_LOGO)
        print(f"Opened source image: {SOURCE_LOGO} ({img.size})")

        # Ensure valid image mode
        if img.mode != 'RGBA':
            img = img.convert('RGBA')

        for folder_name, size in MIPMAP_SIZES.items():
            target_dir = os.path.join(ANDROID_RES_DIR, folder_name)
            
            if not os.path.exists(target_dir):
                print(f"Warning: Directory {target_dir} does not exist, creating it.")
                os.makedirs(target_dir, exist_ok=True)

            # Resize image
            # using LANCZOS for high quality downsampling (older Pillow versions compatibility)
            resize_method = getattr(Image, 'Resampling', Image).LANCZOS
            resized_img = img.resize((size, size), resize_method)
            
            # Save as ic_launcher.png
            icon_path = os.path.join(target_dir, 'ic_launcher.png')
            resized_img.save(icon_path, 'PNG')
            print(f"Saved {icon_path} ({size}x{size})")

            # Save as ic_launcher_round.png (same image for now, unless we want to mask it)
            # For simplicity, we use the same square/rect image as round icon or we could circle crop it.
            # Given the request is just to show the logo, using the same image is safer for visibility 
            # than cropping important parts, unless the user asked for a round crop.
            # We will save the same image.
            round_icon_path = os.path.join(target_dir, 'ic_launcher_round.png')
            resized_img.save(round_icon_path, 'PNG')
            print(f"Saved {round_icon_path}")

        print("Icon generation complete.")

    except Exception as e:
        print(f"Failed to generate icons: {e}")

if __name__ == "__main__":
    generate_icons()
