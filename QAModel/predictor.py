
import pandas as pd
import numpy as np
import torch
from transformers import BertForQuestionAnswering
from transformers import BertTokenizer
import os
from dotenv import load_dotenv
load_dotenv()


MODEL_NAME = os.getenv('MODEL_NAME')

class QAModel():
    def __init__(self):
        self.model = BertForQuestionAnswering.from_pretrained(MODEL_NAME)
        self.tokenizer = BertTokenizer.from_pretrained(MODEL_NAME)
    
    def get_answer(self, question, context):
        input_ids = self.tokenizer.encode(question, context)
        tokens = self.tokenizer.convert_ids_to_tokens(input_ids)
        sep_idx = input_ids.index(self.tokenizer.sep_token_id)
        num_seg_a = sep_idx+1
        num_seg_b = len(input_ids) - num_seg_a
        segment_ids = [0]*num_seg_a + [1]*num_seg_b
        assert len(segment_ids) == len(input_ids)
        output = self.model(torch.tensor([input_ids]),  token_type_ids=torch.tensor([segment_ids]))
        answer_start = torch.argmax(output.start_logits)
        answer_end = torch.argmax(output.end_logits)
        if answer_end >= answer_start:
            answer = tokens[answer_start]
            for i in range(answer_start+1, answer_end+1):
                if tokens[i][0:2] == "##":
                    answer += tokens[i][2:]
                else:
                    answer += " " + tokens[i]
        else:
            answer = "I am unable to find the answer to this question. Can you please ask another question?"
        
        return answer.title()