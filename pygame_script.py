import pygame
import sys
import random

# Initialize Pygame
pygame.init()

# Set up display
width, height = 800, 600
screen = pygame.display.set_mode((width, height))
pygame.display.set_caption("Simple Poker Game")

# Define colors
BLACK = (0, 0, 0)
WHITE = (255, 255, 255)
GREEN = (34, 139, 34)

# Define card properties
suits = ['Hearts', 'Diamonds', 'Clubs', 'Spades']
ranks = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A']
deck = []

# Create a deck of cards
for suit in suits:
    for rank in ranks:
        deck.append(f"{rank} of {suit}")

# Shuffle the deck
random.shuffle(deck)

# Function to draw text on the screen
def draw_text(text, font, color, surface, x, y):
    textobj = font.render(text, True, color)
    textrect = textobj.get_rect()
    textrect.center = (x, y)
    surface.blit(textobj, textrect)

# Variables to control the game state
player_hand = []
dealer_hand = []
cards_dealt = False  # A flag to check if cards are dealt

# Main game loop
running = True
while running:
    for event in pygame.event.get():
        if event.type == pygame.QUIT:
            running = False

    # Fill the screen with green to simulate a poker table
    screen.fill(GREEN)

    # Draw basic game info
    font = pygame.font.Font(None, 36)
    draw_text('Simple Poker Game', font, WHITE, screen, width // 2, 50)
    draw_text('Press SPACE to deal cards', font, WHITE, screen, width // 2, 100)

    # Waiting for space to deal cards
    keys = pygame.key.get_pressed()
    if keys[pygame.K_SPACE] and not cards_dealt and len(deck) >= 4:
        # Deal 2 cards to the player and 2 to the dealer if cards haven't been dealt yet
        player_hand = [deck.pop(), deck.pop()]
        dealer_hand = [deck.pop(), deck.pop()]
        cards_dealt = True  # Mark that cards are dealt

    if cards_dealt:
        # Display player and dealer hands
        draw_text('Your hand:', font, WHITE, screen, width // 4, height // 2 - 50)
        draw_text(f'{player_hand[0]}', font, WHITE, screen, width // 4, height // 2)
        draw_text(f'{player_hand[1]}', font, WHITE, screen, width // 4, height // 2 + 50)

        draw_text('Dealer hand:', font, WHITE, screen, 3 * width // 4, height // 2 - 50)
        draw_text(f'{dealer_hand[0]}', font, WHITE, screen, 3 * width // 4, height // 2)
        draw_text(f'{dealer_hand[1]}', font, WHITE, screen, 3 * width // 4, height // 2 + 50)

        # Display instructions to restart the game
        draw_text('Press R to restart', font, WHITE, screen, width // 2, height - 50)

    # Restart the game
    if keys[pygame.K_r] and cards_dealt:
        # Reset game state and shuffle the deck
        deck.extend(player_hand + dealer_hand)  # Put the cards back in the deck
        random.shuffle(deck)  # Shuffle the deck again
        player_hand = []  # Clear player hand
        dealer_hand = []  # Clear dealer hand
        cards_dealt = False  # Reset the flag

    # Update the display
    pygame.display.flip()

# Clean up and exit
pygame.quit()
sys.exit()
