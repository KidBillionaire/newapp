import pygame
import random
import sys

# Initialize Pygame
pygame.init()

# Set up display
screen = pygame.display.set_mode((640, 480))
pygame.display.set_caption("Rock-Paper-Scissors Game")

def generate_random_hand():
    # Generate a random choice of hand
    return random.choice(['rock', 'paper', 'scissors'])

def draw_hand(hand):
    # Clear the screen
    screen.fill((255, 255, 255))  # Fill the screen with white
    
    # Set up font for text display
    font = pygame.font.Font(None, 74)
    text = font.render(hand, True, (0, 0, 0))  # Black text
    text_rect = text.get_rect(center=(320, 240))  # Center the text
    screen.blit(text, text_rect)  # Draw the text on the screen

    # Update the display
    pygame.display.flip()

def main():
    current_hand = generate_random_hand()  # Generate an initial hand
    
    running = True
    while running:
        for event in pygame.event.get():
            if event.type == pygame.QUIT:
                running = False
        
        # Draw the current hand
        draw_hand(current_hand)

        # Generate a new hand every second
        pygame.time.delay(1000)  # Delay for 1 second
        current_hand = generate_random_hand()  # Update hand

    pygame.quit()
    sys.exit()

if __name__ == "__main__":
    main()
