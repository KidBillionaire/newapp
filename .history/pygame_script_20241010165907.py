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

# Main game loop
running = True
while running:
    for event in pygame.event.get():
        if event.type == pygame.QUIT:
            running = False

    # Fill the screen with a color (RGB)
    screen.fill(BLACK)

    # Draw basic game info
    font = pygame.font.Font(None, 36)
    draw_text('Simple Poker Game', font, WHITE, screen, width // 2, 50)
    draw_text('Press SPACE to deal cards', font, WHITE, screen, width // 2, height // 2)

    # Waiting for space to deal cards
    keys = pygame.key.get_pressed()
    if keys[pygame.K_SPACE]:
        # Deal 2 cards to the player and 2 to the dealer
        player_hand = [deck.pop(), deck.pop()]
        dealer_hand = [deck.pop(), deck.pop()]

        # Display player and dealer hands
        draw_text('Your hand:', font, WHITE, screen, width // 2, height // 2 + 50)
        draw_text(f'{player_hand[0]}', font, WHITE, screen, width // 2, height // 2 + 100)
        draw_text(f'{player_hand[1]}', font, WHITE, screen, width // 2, height // 2 + 150)

        draw_text('Dealer hand:', font, WHITE, screen, width // 2, height // 2 + 250)
        draw_text(f'{dealer_hand[0]}', font, WHITE, screen, width // 2, height // 2 + 300)
        draw_text(f'{dealer_hand[1]}', font, WHITE, screen, width // 2, height // 2 + 350)

    # Update the display
    pygame.display.flip()

# Clean up and exit
pygame.quit()
sys.exit()
