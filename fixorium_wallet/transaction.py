 class Transaction:
    def __init__(self, sender, recipient, amount):
        self.sender = sender
        self.recipient = recipient
        self.amount = amount

    def __str__(self):
        return f'Transaction from {self.sender} to {self.recipient} for {self.amount}'
