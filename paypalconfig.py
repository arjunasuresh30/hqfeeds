from paypal import PayPalConfig
from paypal import PayPalInterface

config = PayPalConfig(API_USERNAME = "arjuna-facilitator_api1.codecognition.com",
                      API_PASSWORD = "1400397653",
                      API_SIGNATURE = "AFcWxV21C7fd0v3bYYYRCpSSRl31AJOjFsnJfV-A-rxmja7OYfv1ST9b",
                      DEBUG_LEVEL=0)

interface = PayPalInterface(config=config)