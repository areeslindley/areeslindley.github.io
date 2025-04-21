# Alun Rees - Personal Portfolio Website

A modern, responsive portfolio website showcasing my work as a data scientist and developer. Built with HTML, CSS, and JavaScript.

## Features

- Clean, modern design with smooth animations
- Responsive layout that works on all devices
- Sections for projects, career history, and blog
- Contact form for inquiries
- Optimized for performance and SEO

## Pages

1. **Home** - Introduction and featured project
2. **About** - Background, skills, and bio
3. **Projects** - Portfolio of work with descriptions
4. **Career** - Timeline of experience and education
5. **Blog** - Articles and insights (placeholder)
6. **Contact** - Contact form and information

## Setup

1. Clone the repository:
```bash
git clone https://github.com/yourusername/alun-website.git
cd alun-website
```

2. Customize the content:
   - Update personal information in HTML files
   - Replace placeholder images
   - Add your own projects and blog posts
   - Update social media links

3. Test locally:
   - Open `index.html` in your browser
   - Test all links and forms
   - Check responsive design on different devices

## Deployment

### GitHub Pages

1. Create a new repository on GitHub
2. Push your code to the repository
3. Go to repository Settings > Pages
4. Select the main branch as source
5. Your site will be available at `https://yourusername.github.io/alun-website`

### Custom Domain

1. Purchase a domain (e.g., from Namecheap, GoDaddy)
2. Add a CNAME file to your repository:
```
alun-rees.com
```

3. Configure DNS settings with your domain provider:
   - Add a CNAME record pointing to `yourusername.github.io`
   - Wait for DNS propagation (can take up to 24 hours)

## Customization

### Colors

The color scheme can be modified in `css/styles.css`:
```css
:root {
    --primary-color: #2d3436;
    --secondary-color: #636e72;
    --accent-color: #0984e3;
    --background-color: #ffffff;
    --text-color: #2d3436;
    --light-gray: #f5f6fa;
    --border-color: #dfe6e9;
}
```

### Fonts

The site uses Inter from Google Fonts. To change the font:
1. Update the Google Fonts link in HTML files
2. Modify the font-family in CSS

## Maintenance

- Regularly update project information
- Add new blog posts
- Keep dependencies up to date
- Test the contact form functionality

## License

This project is open source and available under the MIT License.

## Contact

For questions or suggestions, please reach out through the contact form on the website. 