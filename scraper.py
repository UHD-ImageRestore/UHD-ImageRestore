import requests
from bs4 import BeautifulSoup
import json
import os
from urllib.parse import urljoin
import time
import random

def get_soup(url, headers):
    """Fetches a URL and returns a BeautifulSoup object with retries."""
    for attempt in range(3): # Retry up to 3 times
        try:
            response = requests.get(url, headers=headers, timeout=20)
            response.raise_for_status()
            return BeautifulSoup(response.text, 'lxml')
        except requests.exceptions.RequestException as e:
            print(f"Error fetching {url} on attempt {attempt + 1}: {e}")
            if attempt < 2:
                sleep_time = random.uniform(3, 7)
                print(f"Retrying in {sleep_time:.2f} seconds...")
                time.sleep(sleep_time)
    return None

def scrape_arxiv_page(arxiv_url, headers):
    """Scrapes the arXiv page for authors and affiliations."""
    soup = get_soup(arxiv_url, headers)
    if not soup:
        return "Not available", "Not available"

    authors_div = soup.find('div', class_='authors')
    if not authors_div:
        return "Not found", "Not found"

    authors = [a.text.strip() for a in authors_div.find_all('a')]
    
    affiliations_text = "Not found"
    # Affiliations are often in a separate div or just text nodes, which is harder to parse reliably.
    # This is a best-effort attempt. A more robust solution might need regex or more complex logic.
    affiliation_div = soup.find('div', class_='affiliation')
    if affiliation_div:
        affiliations_text = affiliation_div.text.strip().replace('\n', ' ').replace('  ', ' ')

    return authors, affiliations_text

def scrape_papers_with_code():
    """Main function to scrape paper data."""
    BASE_URL = 'https://paperswithcode.com'
    TASK_URL = f'{BASE_URL}/task/image-super-resolution'
    HEADERS = {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
    }

    # Create directories if they don't exist
    if not os.path.exists('data/images'):
        os.makedirs('data/images')

    print(f"Fetching papers from {TASK_URL}...")
    main_soup = get_soup(TASK_URL, HEADERS)
    if not main_soup:
        print("Failed to fetch the main page after several retries. Exiting.")
        return

    papers_data = []
    paper_cards = main_soup.find_all('div', class_='paper-card', limit=5) # Limit to 5 for this example
    print(f"Found {len(paper_cards)} papers. Processing...")

    for card in paper_cards:
        try:
            # Add a delay before processing each new paper
            time.sleep(random.uniform(2, 5))

            h4_tag = card.find('h4')
            if not h4_tag:
                print("  - Skipping a card because it has no h4 tag.")
                continue
            
            title_element = h4_tag.find('a')
            if not title_element:
                print(f"  - Skipping card with h4: '{h4_tag.text.strip()}' because it has no link.")
                continue

            title = title_element.text.strip()
            paper_page_url = urljoin(BASE_URL, title_element['href'])
            
            print(f"\nProcessing: {title}")
            print(f"  Page URL: {paper_page_url}")

            paper_soup = get_soup(paper_page_url, HEADERS)
            if not paper_soup:
                print(f"  - Could not fetch paper page for '{title}'. Skipping.")
                continue

            # Get arXiv link
            arxiv_link_element = paper_soup.find('a', class_='badge-arxiv')
            if not arxiv_link_element:
                print("  - arXiv link not found.")
                continue
            
            # Add a delay before fetching from arXiv
            time.sleep(random.uniform(1, 3))
            
            arxiv_url = arxiv_link_element['href']
            print(f"  - arXiv URL: {arxiv_url}")

            # Get authors and affiliations from arXiv
            authors, affiliations = scrape_arxiv_page(arxiv_url, HEADERS)
            print(f"  - Authors: {authors}")
            print(f"  - Affiliations: {affiliations}")

            # Get framework image
            image_url = None
            framework_img = paper_soup.select_one('.paper-figure-image img, .paper-abstract img')
            if framework_img and framework_img.get('src'):
                image_url = urljoin(BASE_URL, framework_img['src'])
                print(f"  - Found image: {image_url}")
                
                # Add a delay before downloading image
                time.sleep(random.uniform(1, 2))
                
                # Download image
                img_response = requests.get(image_url, headers=HEADERS)
                if img_response.status_code == 200:
                    # Sanitize filename
                    sanitized_title = "".join(x for x in title if x.isalnum())[:20]
                    img_name = f"{sanitized_title}.png"
                    img_path = os.path.join('data', 'images', img_name)
                    with open(img_path, 'wb') as f:
                        f.write(img_response.content)
                    print(f"  - Image saved to {img_path}")
                else:
                    print("  - Failed to download image.")
                    img_path = None
            else:
                print("  - Framework image not found.")
                img_path = None

            paper_info = {
                'title': title,
                'paper_link': arxiv_url,
                'authors': authors,
                'affiliation': affiliations,
                'framework_image_path': img_path
            }
            papers_data.append(paper_info)

        except Exception as e:
            print(f"An error occurred while processing a paper card: {e}")

    # Save data to JSON file
    with open('data/papers.json', 'w', encoding='utf-8') as f:
        json.dump(papers_data, f, ensure_ascii=False, indent=4)

    print("\nScraping finished. Data saved to data/papers.json")

if __name__ == '__main__':
    scrape_papers_with_code() 