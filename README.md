# Color Tester Application

A React-based tool for analyzing image color palettes against brand guidelines and accessibility standards.

![Demo](https://via.placeholder.com/800x400.png?text=Color+Tester+Demo) *Replace with actual screenshot*

## Table of Contents
- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
- [Technologies Used](#technologies-used)
- [Core Functionality](#core-functionality)
- [Colorblind Simulation](#colorblind-simulation)
- [Acknowledgements](#Acknowledgements)


## Features
✅ **Image Analysis**
- Extract 5 dominant colors from uploaded images
- Display color swatches with hex values

🎨 **Brand Compliance**
- Compare colors to predefined brand palette
- Identify closest brand color matches using Delta E (CIE76)
- Threshold: Delta E < 10 for direct matches

♿ **Accessibility Checks**
- WCAG AA contrast ratio validation (4.5:1 minimum)
- Colorblind impact simulation for:
  - Protanopia (red-blindness)
  - Deuteranopia (green-blindness)
  - Tritanopia (blue-blindness)

## Installation

### Prerequisites
- Node.js (v14+)
- npm (v6+)

### Steps
1. Clone repository:
   ```bash
   git clone https://github.com/yourusername/color-tester.git


  ## Usage

1. **Upload an Image**
   - Click the "Choose File" button to upload an image (JPEG or PNG).
   - Wait for the application to process the image and extract dominant colors.

2. **Review Results**
   - **Extracted Colors**: View the 5 dominant colors displayed as swatches with their hex codes.
   - **Brand Compliance**: 
     - ✅ Green check = Direct match with brand colors (Delta E < 10).
     - 🔍 Magnifier = Closest brand color suggestion.
   - **Accessibility Warnings**:
     - Low-contrast color pairs (contrast ratio < 4.5:1).
     - Colorblind-specific contrast issues.

3. **Interpret Warnings**
   - Red text indicates failing combinations.
   - Hover over issues for detailed contrast ratios.
   - Colorblind impact notes show affected vision types.
## Technologies Used

- **React**: UI framework for building the application.
- **ColorThief**: Library for extracting dominant colors from images.
- **chroma.js**: Library for color manipulation and contrast calculations.
- **Delta E (CIE76)**: Algorithm for calculating color differences.

## Core Functionality

1. **Image Processing**
   - Uploaded images are processed using HTML5 Canvas.
   - Dominant colors are extracted using the median cut algorithm.

2. **Brand Compliance**
   - Extracted colors are compared to the predefined brand palette.
   - Delta E (CIE76) is used to calculate color differences.
   - Colors with Delta E < 10 are considered matches.

3. **Accessibility Checks**
   - Contrast ratios are calculated using WCAG 2.1 guidelines.
   - Colorblindness simulations are applied to test accessibility.

## Colorblind Simulation

The application simulates three types of colorblindness:

1. **Protanopia** (Red-blindness)
   - Red channel: `0.567R + 0.433G`
   - Green channel: `0.558R + 0.442G`
   - Blue channel: `B`

2. **Deuteranopia** (Green-blindness)
   - Red channel: `0.625R + 0.375G`
   - Green channel: `0.7R + 0.3G`
   - Blue channel: `B`

3. **Tritanopia** (Blue-blindness)
   - Red channel: `R`
   - Green channel: `0.95G + 0.05B`
   - Blue channel: `0.433G + 0.567B`
  
 ## Acknowledgements

I would like to express my heartfelt gratitude to **Om Yadav** for their invaluable support and guidance throughout the development of this project. Their assistance and encouragement were instrumental in overcoming challenges and bringing this project to completion. Thank you for always lending a helping hand when in need!

Github profile - github.com/OmYadav3
